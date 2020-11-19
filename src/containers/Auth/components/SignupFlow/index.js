import React, { useState, useEffect, useReducer } from 'react'
import T from 'prop-types'
import { setItem, getItem, removeKey } from 'utils/localStorage'
import { signupFoodmakerAC } from 'actions/signup'
import { connect } from 'react-redux'
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
  { screen: LetsCreate, props: {}, showed: false },
  { screen: BusinessSize, props: { name: 'businessSizeId', value: '' } },
  { screen: BusinessProfile, props: { name: 'businessProfileId', value: '' } },
  { screen: PhoneStep, props: { name: 'phone', value: '' } },
  {
    screen: SocialsStep,
    props: { name: 'socialURL', value: ['www.hh.com/', 'www.facebook.com/', 'www.instagram.com/'] },
  },
  {
    screen: BusinessAdress,
    props: { name: 'businessAdress', value: { adress: '', location: '' } },
  },
  { screen: ServiceOffering, props: { name: 'businessServiceIds', value: [] } },
  { screen: ProfileName, props: { name: 'profileName', value: '' } },
  {
    screen: WebSiteName,
    props: { name: 'hungryHuggerLink', value: 'www.hungryhugger.wildwebart.com/' },
  },
  { screen: AboutYourself, props: { name: 'about', value: '' } },
  {
    screen: Tags,
    props: { name: 'serviceTagIds', value: { serviceTagIds: [], specialityTagIds: [] } },
  },
  { screen: Photo, props: { name: 'otherPhotos', value: { coverPhoto: '', otherPhotos: [] } } },
  { screen: Requesting, props: { name: 'requesting', value: '' } },
  { screen: Congrats, props: { name: 'congratz', value: '' } },
  { screen: Finish, props: { name: 'finish', value: '' } },
]

const Signup = ({ signupFoodmakerAC, requesting, success, error }) => {
  const [step, setStep] = useState(getItem('step') ? getItem('step') : 0)
  const [direction, setDirection] = useState('forward')

  function reducer(state, action) {
    switch (action.type) {
      case 'RESTORE':
        const { payload } = action
        return steps.map((e, i) => ({ screen: e.screen, ...payload[i] }))
      case 'SHOWED':
        return state.map((s, i) => (i === 5 ? { ...s, showed: true } : s))
      case 'SUBMIT':
        const { submitData, step } = action.data
        return state.map((s, i) =>
          i === step ? { ...s, props: { ...s.props, value: submitData[s.props.name] } } : s,
        )
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

  useEffect(() => setItem('signup_data', state), [state])

  useEffect(() => {
    const lastStep = getItem('step')

    if (lastStep < step || step === 1) setItem('step', step)

    if (step === 5 && !state[5].showed) {
      setTimeout(() => {
        setStep(6)
        dispatch({ type: 'SHOWED' })
      }, 5000)
    }

    if (step === 5 && state[step].showed && direction === 'forward') {
      setStep(6)
    }

    if (step === 18) {
      setTimeout(() => {
        setStep(19)
      }, 5000)
    }

    if (step === 19) {
      removeKey('signup_data')
      removeKey('step')
    }
  }, [step])

  useEffect(() => {
    if (step === 17) {
      if (!requesting && success) setStep(18)
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
      setStep(4)
    } else {
      setStep((curstep) => curstep - 1)
    }
  }

  const Screen = state[step].screen
  const properties =
    step !== 17
      ? state[step].props
      : { setStep, signupFoodmakerAC, state, requesting, success, error }

  return (
    <SignupContainer footer stepBack={stepBack} step={step}>
      <Screen onSubmit={onSubmit} properties={properties} />
    </SignupContainer>
  )
}

Signup.propTypes = {
  signupFoodmakerAC: T.func,
  requesting: T.bool,
  success: T.bool,
  error: T.bool,
}

export default connect(
  ({ signup: { requesting, success, error } }) => ({ requesting, success, error }),
  {
    signupFoodmakerAC,
  },
)(Signup)
