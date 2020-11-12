import React from 'react'
import T from 'prop-types'
import { setItem } from 'utils/localStorage'
import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import open from 'assets/images/open-table.svg'
import styles from './step1.module.scss'
import './step1.less'

const Step1 = (props) => {
  const { setStep } = props

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  })

  const onNext = (data) => {
    setItem('addProduct', data)
    setStep()
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img className={styles.open} src={open} alt="open" />
        <p className={styles.header}>Start setting up you shop now</p>
        <form className={styles.form} onSubmit={handleSubmit(onNext)}>
          <label htmlFor="step1" className={styles.label}>
            Shop name (you can change it later)
          </label>
          <input
            id="step1"
            name="shopName"
            ref={register({
              required: true,
              maxLength: {
                value: 200,
              },
            })}
          />
          {_.get('shopName.type', errors) === 'required' && (
            <p className={styles.errmsg}>This field is required</p>
          )}
          {_.get('shopName.type', errors) === 'maxLength' && (
            <p className={styles.errmsg}>Max length 200 symbols</p>
          )}
          <p className={styles.description}>You can create one experience for free forever.</p>
          <input type="submit" value="Next" />
        </form>
      </div>
    </div>
  )
}

Step1.propTypes = {
  setStep: T.func.isRequired,
}

export default Step1
