import React, { useState, useEffect, useReducer } from 'react'
import T from 'prop-types'
import { setItem, getItem, removeKey } from 'utils/localStorage'
import { signupFoodmakerAC, signupLoverAsMakerAC } from 'actions/signup'
import { getUserAccount } from 'actions/account'
import { getCitiesAC } from 'actions/system'
import { connect } from 'react-redux'
import Modal from 'components/UniversalModal'
import Message from './components/Message'
import SignupContainer from './components/container'
import FirstNameStep from './steps/FirstName'
import LastNameStep from './steps/LastName'
import EmailStep from './steps/Email'
import CreatePassword from './steps/CreatePassword'
import City from './steps/City'
import LetsCreate from './steps/LetsCreate'
import BusinessSize from './steps/BusinessSize'
import BusinessProfile from './steps/BusinessProfile'
import PhoneStep from './steps/Phone'
import SocialsStep from './steps/Socials'
import BusinessAdress from './steps/BusinessAdress'
import ServiceOffering from './steps/ServiceOffering'
import ProfileName from './steps/ProfileName'
import WebSiteName from './steps/WebSiteName'
import AboutYourself from './steps/AboutYourself'
import Tags from './steps/Tags'
import Photo from './steps/Photo'
import Requesting from './steps/Requesting'
import Congrats from './steps/Congrats'
import Finish from './steps/Finish'

const steps = [
  { screen: FirstNameStep, props: { name: 'firstName', value: '' } },
  { screen: LastNameStep, props: { name: 'lastName', value: '' } },
  { screen: EmailStep, props: { name: 'email', value: '' } },
  { screen: CreatePassword, props: { name: 'password', value: '' } },
  { screen: City, props: { name: 'city', value: '' } },
  { screen: LetsCreate, props: { name: 'letsCreate' }, showed: false }, // 5
  { screen: BusinessSize, props: { name: 'businessSizeId', value: '' } },
  { screen: BusinessProfile, props: { name: 'businessProfileId', value: '' } },
  { screen: PhoneStep, props: { name: 'phone', value: '' } },
  {
    screen: SocialsStep,
    props: {
      name: 'socialURL',
      value: ['www.hungryhugger.com/', 'www.facebook.com/', 'www.instagram.com/'],
    },
  },
  {
    screen: BusinessAdress,
    props: { name: 'businessAdress', value: { adress: '', location: '' } },
  },
  { screen: ServiceOffering, props: { name: 'businessServiceIds', value: [] } }, // 11
  { screen: ProfileName, props: { name: 'profileName', value: '' } },
  {
    screen: WebSiteName,
    props: { name: 'hungryHuggerLink', value: 'www.hungryhugger.com/' },
  },
  { screen: AboutYourself, props: { name: 'about', value: '' } }, // 14
  {
    screen: Tags,
    props: { name: 'serviceTagIds', value: { serviceTagIds: [], specialityTagIds: [] } },
  },
  { screen: Photo, props: { name: 'otherPhotos', value: { coverPhoto: '', otherPhotos: [] } } }, // 16
  { screen: Requesting, props: { name: 'requesting', value: '' } },
  { screen: Congrats, props: { name: 'congratz', value: '' } },
  { screen: Finish, props: { name: 'finish', value: '' } },
]

const Signup = ({
  signupFoodmakerAC,
  signupLoverAsMakerAC,
  getUserAccount,
  role,
  cities,
  getCitiesAC,
  requesting,
  success,
  error,
  profileName,
  email,
}) => {
  const [step, setStep] = useState(getItem('step') ? getItem('step') : 0)
  const [direction, setDirection] = useState('forward')
  const [hhLink, setHHLink] = useState('')
  const [msg, setMsg] = useState(false)

  const isProcess = getItem('signup_data') && !!getItem('signup_data')[0]?.props?.value

  function reducer(state, action) {
    switch (action.type) {
      case 'RESTORE':
        const { payload } = action
        return steps.map((e, i) => ({ screen: e.screen, ...payload[i] }))
      case 'SHOWED':
        return state.map((s, i) =>
          steps[i].props.name === 'letsCreate' ? { ...s, showed: true } : s,
        )
      case 'SUBMIT':
        const { submitData, step } = action.data
        if (steps[step].props.name === 'hungryHuggerLink') setHHLink(submitData.hungryHuggerLink)
        return state.map((s, i) =>
          i === step ? { ...s, props: { ...s.props, value: submitData[s.props.name] } } : s,
        )
      case 'RESET':
        return [...steps]
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(
    reducer,
    getItem('signup_data')
      ? steps.map((e, i) => ({ screen: e.screen, ...getItem('signup_data')[i] }))
      : steps,
  )

  if (
    role === 'FOODLOVER' &&
    ['email', 'password', 'profileName'].includes(steps[step].props.name) &&
    profileName &&
    email
  ) {
    direction === 'forward' ? setStep((s) => s + 1) : setStep((s) => s - 1)
  }

  useEffect(() => {
    getCitiesAC()
    const id = getItem('user-id')
    if (id) getUserAccount(id)
  }, [])

  useEffect(() => {
    if (isProcess) setMsg('true')
  }, [isProcess])

  useEffect(() => setItem('signup_data', state), [state])

  useEffect(() => {
    const lastStep = getItem('step')

    if (lastStep < step || step === 1) setItem('step', step)

    if (steps[step].props.name === 'letsCreate' && !state[step].showed) {
      setTimeout(() => {
        setStep((s) => s + 1)
        dispatch({ type: 'SHOWED' })
      }, 2500)
    }

    if (steps[step].props.name === 'letsCreate' && state[step].showed && direction === 'forward') {
      setStep((s) => s + 1)
    }

    if (steps[step].props.name === 'congratz') {
      setTimeout(() => {
        setStep((s) => s + 1)
      }, 5000)
    }

    if (steps[step].props.name === 'finish') {
      removeKey('signup_data')
      removeKey('step')
    }
  }, [step])

  useEffect(() => {
    if (steps[step].props.name === 'requesting') {
      if (!requesting && success) setStep((s) => s + 1)
    }
  }, [success])

  const onSubmit = (submitData) => {
    dispatch({ type: 'SUBMIT', data: { submitData, step } })
    if (step + 1 === state.length) return
    setDirection('forward')
    setStep((curstep) => curstep + 1)
  }

  const stepBack = () => {
    if (step === 0) return
    setDirection('back')
    if (step === 6 && state[step - 1].showed) {
      // !!!! step next to "LetsCreate"
      setStep(4)
    } else {
      setStep((curstep) => curstep - 1)
    }
  }

  const Screen = state[step].screen

  let properties =
    steps[step].props.name !== 'requesting'
      ? state[step].props
      : {
          setStep,
          signupFoodmakerAC,
          signupLoverAsMakerAC,
          state,
          foodlover: role === 'FOODLOVER',
          requesting,
          success,
          error,
        }
  /* if (steps[step].props.name === 'email') {
    properties = {
      ...state[step].props,
      email,
    }
  }
  if (steps[step].props.name === 'profileName')
    properties = {
      ...state[step].props,
      profileName,
    } */
  if (steps[step].props.name === 'city') properties = { ...state[step].props, cities }

  const closeModal = (e) => {
    setMsg(false)
  }

  const reset = () => {
    removeKey('signup_data')
    removeKey('step')
    dispatch({ type: 'RESET' })
    setStep(0)
    setMsg(false)
  }

  return (
    <>
      <SignupContainer footer stepBack={stepBack} step={step}>
        <Screen onSubmit={onSubmit} properties={properties} hhLink={hhLink} />
      </SignupContainer>
      {msg && (
        <Modal closeFunc={closeModal} option>
          <Message reset={reset} />
        </Modal>
      )}
    </>
  )
}

Signup.propTypes = {
  signupFoodmakerAC: T.func,
  signupLoverAsMakerAC: T.func,
  role: T.string,
  getCitiesAC: T.func,
  getUserAccount: T.func,
  requesting: T.bool,
  success: T.bool,
  error: T.bool,
  profileName: T.string,
  email: T.string,
}

export default connect(
  ({
    signup: { requesting, success, error },
    system: { cities },
    account: { role, profileName, email },
  }) => ({
    role,
    requesting,
    success,
    error,
    cities,
    profileName,
    email,
  }),
  {
    signupFoodmakerAC,
    signupLoverAsMakerAC,
    getCitiesAC,
    getUserAccount,
  },
)(Signup)
