import React, { useState, useEffect, useReducer } from 'react'
import T from 'prop-types'
import { setItem, getItem, removeKey } from 'utils/localStorage'
import SignupContainer from './components/container'
import FirstNameStep from './steps/FirstName'
import LastNameStep from './steps/LastName'
import EmailStep from './steps/Email'
import CreatePassword from './steps/CreatePassword'
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
import Congrats from './steps/Congrats'
import Finish from './steps/Finish'
import TMP from './steps/1TMP'

const steps = [
  { screen: FirstNameStep, props: { name: 'firstName', value: '' } },
  { screen: LastNameStep, props: { name: 'lastName', value: '' } },
  { screen: EmailStep, props: { name: 'email', value: '' } },
  { screen: CreatePassword, props: { name: 'password', value: '' } },
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
  { screen: WebSiteName, props: { name: 'hungryHuggerLink', value: 'www.hungryhugger.com/' } },
  { screen: AboutYourself, props: { name: 'about', value: '' } },
  {
    screen: Tags,
    props: { name: 'serviceTagIds', value: { serviceTagIds: [], specialityTagIds: [] } },
  },
  { screen: Photo, props: { name: 'otherPhotos', value: { coverPhoto: '', otherPhotos: [] } } },
  { screen: Congrats, props: { name: 'congratz', value: '' } },
  { screen: Finish, props: { name: 'finish', value: '' } },
]

const Signup = () => {
  const [step, setStep] = useState(getItem('step') ? getItem('step') : 0)
  const [direction, setDirection] = useState('forward')

  function reducer(state, action) {
    switch (action.type) {
      case 'RESTORE':
        const { payload } = action
        return steps.map((e, i) => ({ screen: e.screen, ...payload[i] }))
      case 'SHOWED':
        return state.map((s, i) => (i === 4 ? { ...s, showed: true } : s))
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
    if (getItem('step') < step) setItem('step', step)
    if (step === 17) {
      removeKey('signup_data')
      removeKey('step')
    }
  }, [step])

  if (step === 4 && !state[4].showed) {
    setTimeout(() => {
      setStep(5)
      dispatch({ type: 'SHOWED' })
      // steps[step].showed = true
    }, 5000)
  }

  if (step === 4 && state[step].showed && direction === 'forward') {
    setStep(5)
  }

  const collectData = (state) => {
    return state.slice(0, 16).reduce(
      (acc, step, index) => {
        if (step.props.name === 'serviceTagIds') {
          acc.serviceTagIds = step.props.value.serviceTagIds
          acc.specialityTagIds = step.props.value.specialityTagIds
          return acc
        }
        if (step.props.name === 'otherPhotos') {
          acc.coverPhoto = step.props.value.coverPhoto
          acc.otherPhotos = step.props.value.otherPhotos
          return acc
        }
        if (index === 4) return acc
        acc[step.props.name] = step.props.value
        return acc
      },
      {
        cityId: 1,
        role: 'FOODMAKER',
        registrationLink: 'https://registration_link_should_be_here',
      },
    )
  }

  if (step === 16) {
    console.log('%c   collected   ', 'color: black; background: gold;', collectData(state))
    setTimeout(() => {
      setStep(17)
    }, 5000)
  }

  const onSubmit = (submitData) => {
    dispatch({ type: 'SUBMIT', data: { submitData, step } })
    // steps[step].props.value = submitData[steps[step].props.name]
    if (step + 1 === state.length) return
    setDirection('forward')
    setStep((curstep) => curstep + 1)
    // console.clear()
    console.log('submitData', submitData)
    if (step === 16) collectData(state)
  }

  const stepBack = () => {
    if (step === 0) return
    setDirection('back')
    if (step === 5 && state[step - 1].showed) {
      setStep(3)
    } else {
      setStep((curstep) => curstep - 1)
    }
  }

  const Screen = state[step].screen
  const properties = state[step].props

  return (
    <SignupContainer footer stepBack={stepBack} step={step}>
      {/* <TMP steps={state} step={step} setStep={setStep} /> */}
      <Screen onSubmit={onSubmit} properties={properties} />
    </SignupContainer>
  )
}

Signup.propTypes = {}

export default Signup
