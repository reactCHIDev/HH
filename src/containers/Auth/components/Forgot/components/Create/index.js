import React, { useState } from 'react'
import T from 'prop-types'
import * as jwt from 'jsonwebtoken'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import EyeOpen from 'assets/icons/svg/eye-open.svg'
import EyeClosed from 'assets/icons/svg/eye-closed.svg'
import styles from './create.module.scss'

const Create = ({ close, onSubmit }) => {
  let { user } = useParams()
  console.log('user', user)
  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onBlur',
  })

  const backToLogin = () => {
    if (typeof close === 'function') close()
  }

  const [type, setType] = useState('password')

  const togglePassword = () => {
    setType(type === 'password' ? 'text' : 'password')
  }

  return (
    <div className={styles.content}>
      <p className={styles.header}>Let's create your new password!</p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input_wrapper}>
          <input
            name="password"
            placeholder="Letters, numbers, length 8"
            type={type}
            ref={register({
              required: true,
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
        </div>
        {errors?.password?.type === 'required' && <p>This field is required</p>}
        {errors?.password?.type === 'pattern' && <p>Letters, numbers, length 8</p>}

        <input
          name="confirm"
          placeholder="confirm"
          type={type}
          ref={register({
            required: true,
            validate: (value) => value === watch('password'),
          })}
        />
        {errors?.confirm?.type === 'required' && <p>This field is required</p>}
        {errors?.confirm?.type === 'validate' && <p>Passwords don't match</p>}

        <input type="submit" value="Create password" />
      </form>
    </div>
  )
}

Create.propTypes = {
  close: T.func,
  onSubmit: T.func,
}

export default Create
