import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import T from 'prop-types'
import cls from 'classnames'
import Heading from '../../components/heading'
import styles from './phone.module.scss'
import './phone.less'

const PhoneStep = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props

  const [prefix, setPrefix] = useState('')
  const [phone, setPhone] = useState('')

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  })

  useEffect(() => {
    if (value && value.includes('-')) {
      const [prefix, phone] = value.split('-')
      setPrefix(prefix)
      setPhone(phone)
    } else {
      setPhone(value)
    }
  }, [value])

  const onChangePrefix = (e) => setPrefix(e.target.value)
  const onChangePhone = (e) => setPhone(e.target.value)

  const submitData = (data) => {
    return { phone: data.prefix + '-' + data.phone }
  }

  return (
    <>
      <Heading category="Contact info (not-public)" name="Phone" />
      <div className={cls(styles.container, 'select')}>
        <form className={styles.form} onSubmit={handleSubmit((data) => onSubmit(submitData(data)))}>
          <div className={styles.input_wrapper}>
            <div className={styles.prefix_wrapper}>
              <input
                className={styles.prefix}
                name="prefix"
                placeholder="Country code"
                value={prefix}
                type="text"
                onChange={onChangePrefix}
                // autoFocus={focus}
                ref={register({
                  required: true,
                  pattern: {
                    value: /^(?=.*\d).{1,5}$/,
                  },
                })}
              />
              {errors?.prefix?.type === 'required' && <p>This field is required</p>}
              {errors?.prefix?.type === 'pattern' && <p>1-5 ditits</p>}
            </div>
            <div className={styles.phone_wrapper}>
              <input
                className={styles.phone}
                name="phone"
                placeholder="Contact number"
                value={phone}
                type="text"
                onChange={onChangePhone}
                // autoFocus={focus}
                ref={register({
                  required: true,
                  pattern: {
                    value: /^(?=.*\d).{8,12}$/,
                  },
                })}
              />
              {errors?.phone?.type === 'required' && <p>This field is required</p>}
              {errors?.phone?.type === 'pattern' && <p>8-12 digits</p>}
            </div>
          </div>
          <input className={styles.submit} type="submit" value="Next >" />
        </form>
        {/* <Input
          name="phone"
          placeholder=""
          value={value}
          focus
          onSubmit={onSubmit}
          registerObj={{
            required: true,
            pattern: {
              value: /([- _():=+]?\d[- _():=+]?){0,5}(\s*)?/,
              message: 'Invalid name symbols or less than 8 digits',
            },
          }}
        />
        <Input
          name={name}
          placeholder="phone"
          value={value}
          focus
          onSubmit={onSubmit}
          registerObj={{
            required: true,
            pattern: {
              value: /([- _():=+]?\d[- _():=+]?){10,14}(\s*)?/,
              message: 'Invalid name symbols or less than 8 digits',
            },
          }}
        /> */}
      </div>
    </>
  )
}

PhoneStep.propTypes = {}

export default PhoneStep
