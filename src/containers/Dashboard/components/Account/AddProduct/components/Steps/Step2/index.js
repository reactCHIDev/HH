import React from 'react'
import T from 'prop-types'
import { setItem } from 'utils/localStorage'
import { Select } from 'antd'
import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import styles from './step2.module.scss'
import './step2.less'

const Step2 = (props) => {
  const { setStep } = props

  const { Option } = Select

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  })

  const nums = ['Food', 'Drinks', 'qweqwe', 'sdfsdfsd', 'zxczxcz', 'yuryutyu', 'ghfghfg']

  const onNext = (data) => {
    // setItem('addProduct', data)
    console.log('%c   data   ', 'color: darkgreen; background: palegreen;', data)
    setStep()
  }

  const handleTypeChange = () => {}

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit(onNext)}>
          <label htmlFor="step2" className={styles.label}>
            Product title (no more than 66 char. recommened)
          </label>
          <input
            id="step2"
            name="title"
            ref={register({
              required: true,
              maxLength: {
                value: 66,
              },
            })}
          />
          {_.get('title.type', errors) === 'required' && (
            <p className={styles.errmsg}>This field is required</p>
          )}
          {_.get('title.type', errors) === 'maxLength' && (
            <p className={styles.errmsg}>Max length 66 symbols</p>
          )}
          <label htmlFor="step2-2" className={styles.label}>
            Product title (no more than 66 char. recommened)
          </label>
          <textarea
            className={styles.textarea}
            name="description"
            rows="8"
            cols="42"
            ref={register({
              required: true,
            })}
          />
          {_.get('description.type', errors) === 'required' && (
            <p className={styles.errmsg}>This field is required</p>
          )}
          <Select defaultValue={nums[0]} onChange={handleTypeChange}>
            {nums.map((n, i) => (
              <Option key={i + n} value={n}>
                {n}
              </Option>
            ))}
          </Select>
          <input type="submit" value="Next" />
        </form>
      </div>
    </div>
  )
}

Step2.propTypes = {
  setStep: T.func.isRequired,
}

export default Step2
