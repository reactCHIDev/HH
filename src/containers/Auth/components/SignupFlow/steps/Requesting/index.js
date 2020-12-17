import React, { useEffect } from 'react'
import { setItem, getItem, removeKey } from 'utils/localStorage'

import styles from './requesting.module.scss'

const Requesting = ({
  properties: {
    setStep,
    signupFoodmakerAC,
    signupLoverAsMakerAC,
    foodlover,
    state,
    requesting,
    success,
    error,
  },
}) => {
  setItem('registering', 'true')

  useEffect(() => {
    if (!foodlover)
      signupFoodmakerAC(
        state.slice(0, 17).reduce(
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
            if (step.props.name === 'city') {
              acc.cityId = step.props.value
              return acc
            }
            if (step.props.name === 'socialURL' && step.props.value.join('').length === 46)
              return acc

            if (
              step.props.name === 'businessAdress' &&
              step.props.value.adress === '' &&
              step.props.value.location === ''
            )
              return acc

            /*  if (step.props.name === 'hungryHuggerLink') {
            acc.hungryHuggerLink = step.props.value.replace(
              'www.hungryhugger.com/',
              'https://hungryhugger.wildwebart.com/',
            )
            return acc
          } */

            if (step.props.name === 'about' && step.props.value === '') return acc

            if (index === 5) return acc
            acc[step.props.name] = step.props.value
            return acc
          },
          {
            // cityId: 1,
            role: 'FOODMAKER',
          },
        ),
      )
    if (foodlover)
      signupLoverAsMakerAC(
        state.slice(0, 17).reduce(
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
            if (step.props.name === 'city') {
              acc.cityId = step.props.value
              return acc
            }
            if (step.props.name === 'socialURL' && step.props.value.join('').length === 46)
              return acc

            if (
              step.props.name === 'businessAdress' &&
              step.props.value.adress === '' &&
              step.props.value.location === ''
            )
              return acc

            /*  if (step.props.name === 'hungryHuggerLink') {
          acc.hungryHuggerLink = step.props.value.replace(
            'www.hungryhugger.com/',
            'https://hungryhugger.wildwebart.com/',
          )
          return acc
        } */

            if (step.props.name === 'about' && step.props.value === '') return acc

            if (step.props.name === 'email') {
              acc.login.email = step.props.value
              return acc
            }

            if (step.props.name === 'password') {
              acc.login.password = step.props.value
              return acc
            }

            if (step.props.name === 'profileName') return acc

            if (index === 5 || index === 4) return acc

            acc[step.props.name] = step.props.value
            return acc
          },
          {
            // cityId: 1,
            role: 'FOODMAKER',
            login: { email: '', password: '' },
          },
        ),
      )
  }, [])

  const onError = () => {
    removeKey('registering')
    setStep(0)
  }

  return (
    <>
      <p className={styles.heading}>{!error ? 'Processing...' : 'Error:'}</p>
      {error && <p className={styles.category}>Something went wrong !</p>}
      {error && (
        <input
          className={styles.next}
          disabled={!error}
          onClick={onError}
          type="button"
          value="Review info"
        />
      )}
    </>
  )
}

Requesting.propTypes = {}

export default Requesting
