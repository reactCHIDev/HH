import React, { useState } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { useForm } from 'react-hook-form'
import Check from 'assets/images/signup-flow/svg/greencheck.svg'
import Cross from 'assets/images/signup-flow/svg/cross.svg'
import EyeOpen from 'assets/icons/svg/eye-open.svg'
import EyeClosed from 'assets/icons/svg/eye-closed.svg'
import Heading from '../../components/heading'
import Input from '../../components/input'
import styles from './password.module.scss'

const CreatePassword = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props

  const { register, handleSubmit } = useForm({
    mode: 'onBlur',
  })

  const [inputValue, setValue] = useState('')
  const [type, setType] = useState('password')

  const [letter, setLetter] = useState(false)
  const [number, setNumber] = useState(false)
  const [length, setLength] = useState(false)

  const validation = (str) => {
    setLetter(/[a-zA-Z]/.test(str))
    setNumber(/[0-9]/.test(str))
    setLength(str.length >= 8)
  }

  const onChange = (e) => {
    setValue(e.target.value)
    validation(e.target.value)
  }

  const togglePassword = () => {
    setType(type === 'password' ? 'text' : 'password')
  }

  return (
    <div className={styles.container}>
      <Heading category="Basic info" name="Create password" />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input_wrapper}>
          <input
            name={name}
            placeholder="password"
            value={inputValue}
            type={type}
            onChange={onChange}
            ref={register({
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
                minLength: {
                  value: 8,
                  message: 'Min length 8 symbols',
                },
                message: 'Invalid name symbols',
              },
            })}
          />
          <button type="button" className={styles.psw_eye} onClick={togglePassword}>
            <img src={type === 'password' ? EyeOpen : EyeClosed} alt="eye" />
          </button>
          <input type="submit" value=">" />
        </div>
      </form>

      <div className={styles.valid_block}>
        <div className={styles.valid}>
          <img
            className={cls(styles.icon, !letter ? styles.show : styles.hide)}
            src={Cross}
            alt="cross"
          />
          <img
            className={cls(styles.icon, letter ? styles.show : styles.hide)}
            src={Check}
            alt=""
          />
          <p>At least one letter</p>
        </div>
        <div className={styles.valid}>
          <img
            className={cls(styles.icon, !number ? styles.show : styles.hide)}
            src={Cross}
            alt="cross"
          />
          <img
            className={cls(styles.icon, number ? styles.show : styles.hide)}
            src={Check}
            alt=""
          />
          <p>At least one number</p>
        </div>
        <div className={styles.valid}>
          <img
            className={cls(styles.icon, !length ? styles.show : styles.hide)}
            src={Cross}
            alt="cross"
          />
          <img
            className={cls(styles.icon, length ? styles.show : styles.hide)}
            src={Check}
            alt=""
          />
          <p>At least 8 symbols</p>
        </div>
      </div>
    </div>
  )
}

CreatePassword.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
  }),
  onSubmit: T.func,
}

export default CreatePassword
