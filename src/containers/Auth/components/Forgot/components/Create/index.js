import React, { useState } from 'react'
import T from 'prop-types'
import { useForm } from 'react-hook-form'
import EyeOpen from 'assets/icons/svg/eye-open.svg'
import EyeClosed from 'assets/icons/svg/eye-closed.svg'
import styles from './create.module.scss'

const Create = ({ onSubmit }) => {
  const [type, setType] = useState('password')

  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onBlur',
  })

  const togglePassword = () => {
    setType(type === 'password' ? 'text' : 'password')
  }

  return (
    <div className={styles.content} onClick={(e) => e.stopPropagation()}>
      <p className={styles.header}>Let's create your new password!</p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input_wrapper}>
          <input
            name="password"
            placeholder="8 characters, 1 letter and 1 number"
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
          placeholder="Confirm password"
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
  onSubmit: T.func.isRequired,
}

export default Create
