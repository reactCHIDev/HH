import React from 'react'
import T from 'prop-types'
import { setItem, getItem } from 'utils/localStorage'
import { useForm } from 'react-hook-form'
import { isShopExist } from 'api/requests/Shop'
import _ from 'lodash/fp'
import open from 'assets/images/open-table.svg'
import addHint from 'assets/icons/svg/add_hint.svg'
import styles from './step1.module.scss'
import './step1.less'

const Step1 = (props) => {
  const { setStep, stepper, setStepper } = props

  let shopName = ''
  const allValues = getItem('addExperience')
  if (allValues?.shopName) shopName = allValues?.shopName

  const { register, handleSubmit, control, watch, errors } = useForm({
    mode: 'onBlur',
    defaultValues: { shopName },
  })

  const onNext = (name) => {
    const values = getItem('addExperience')
    setItem('addExperience', { ...values, ...name })
    setStep(1)
    setStepper(false)
  }

  const onChangeForm = () => {
    if (!stepper) setStepper(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img className={styles.open} src={open} alt="open" />
        <p className={styles.header}>Start setting up you shop now</p>
        <form className={styles.form} onChange={onChangeForm} onSubmit={handleSubmit(onNext)}>
          <label className={styles.label}>Shop name (you can change it later)</label>
          <input
            className={styles.input}
            id="step1"
            name="shopName"
            type="text"
            ref={register({
              required: true,
              validate: async (value) => {
                const name = await isShopExist(value)
                return !name.data
              },
              maxLength: {
                value: 66,
              },
            })}
          />
          {_.get('shopName.type', errors) === 'required' && (
            <p className={styles.errmsg}>This field is required</p>
          )}
          {_.get('shopName.type', errors) === 'validate' && (
            <p className={styles.errmsg}>This name is already exist</p>
          )}
          {_.get('shopName.type', errors) === 'maxLength' && (
            <p className={styles.errmsg}>Max length 66 symbols</p>
          )}
          {/* <div className={styles.hint_wrapper}>
            <img className={styles.hint_icon} src={addHint} alt="hint" />
            <p className={styles.hint}>You can create one experience for free forever.</p>
          </div> */}
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
