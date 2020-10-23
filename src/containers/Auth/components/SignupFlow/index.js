import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import SignupContainer from './components/container'
import FirstNameStep from './steps/FirstName'
import LastNameStep from './steps/LastName'
import EmailStep from './steps/Email'
import CreatePassword from './steps/CreatePassword'
import CityStep from './steps/City'
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
    props: { name: 'social', value: ['www.', 'www.facebook.com/', 'www.instagram.com/'] },
  },
  {
    screen: BusinessAdress,
    props: { name: 'businessAddressId', value: { adress: '', mapURL: '' } },
  },
  { screen: ServiceOffering, props: { name: 'businessServiceIds', value: [] } },
  { screen: ProfileName, props: { name: 'profileName', value: '' } },
  { screen: WebSiteName, props: { name: 'hungryHuggerLink', value: 'www.hungryhugger.com/' } },
  { screen: AboutYourself, props: { name: 'about', value: '' } },
  { screen: Tags, props: { name: 'serviceTagIds', value: { mainTags: [], addTags: [] } } },
  { screen: Photo, props: { name: 'otherPhotos', value: { coverPhoto: '', otherPhotos: [] } } },
  { screen: Congrats, props: {} },
  { screen: Finish, props: { name: 'finish', value: '' } },
]

const Signup = () => {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState('forward')

  if (step === 4 && !steps[step].showed) {
    setTimeout(() => {
      setStep(5)
      steps[step].showed = true
    }, 5000)
  }
  if (step === 4 && steps[step].showed && direction === 'forward') {
    setStep(5)
  }
  if (step === 16) {
    setTimeout(() => {
      setStep(17)
    }, 5000)
  }

  const onSubmit = (submitData) => {
    steps[step].props.value = submitData[steps[step].props.name]
    if (step + 1 === steps.length) return
    setDirection('forward')
    setStep((curstep) => curstep + 1)
    console.clear()
    console.log('steps', steps)
    console.log('submitData', submitData)
  }

  const stepBack = () => {
    if (step === 0) return
    setDirection('back')
    if (step === 5 && steps[step - 1].showed) {
      setStep(4)
    } else {
      setStep((curstep) => curstep - 1)
    }
  }

  const Screen = steps[step].screen
  const properties = steps[step].props

  return (
    <SignupContainer footer stepBack={stepBack} step={step}>
      <TMP steps={steps} step={step} setStep={setStep} />
      <Screen onSubmit={onSubmit} properties={properties} />
    </SignupContainer>
  )
}

Signup.propTypes = {}

export default Signup
