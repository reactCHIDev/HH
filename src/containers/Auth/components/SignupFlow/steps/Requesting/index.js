import React, { useEffect } from 'react'
import styles from './requesting.module.scss'

const Requesting = ({
  properties: { setStep, signupFoodmakerAC, state, requesting, success, error },
}) => {
  useEffect(() => {
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
          if (step.props.name === 'socialURL' && step.props.value.join('').length === 46) return acc

          if (
            step.props.name === 'businessAdress' &&
            (step.props.value.adress === '' || step.props.value.location === '')
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

          if (index === 5 || index === 4) return acc
          acc[step.props.name] = step.props.value
          return acc
        },
        {
          cityId: 1,
          role: 'FOODMAKER',
        },
      ),
    )
  }, [])

  return (
    <>
      <p className={styles.heading}>{!error ? 'Processing...' : 'Error:'}</p>
      {error && error.map((err) => <p className={styles.category}>{err}</p>)}
      {error && (
        <input
          className={styles.next}
          disabled={!error}
          onClick={() => setStep(0)}
          type="button"
          value="Review info"
        />
      )}
    </>
  )
}

Requesting.propTypes = {}

export default Requesting
