import React from 'react'
import { useForm } from 'react-hook-form'
import _ from 'lodash/fp'
import { Link } from 'react-router-dom'
import { history } from 'store'

import T from 'prop-types'
import styles from './login.module.scss'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Login = ({ data }) => {
  const { register, handleSubmit, errors, formState } = useForm()
  const onSubmit = async (data) => {
    await sleep(2000)
    console.log(data)
  }

  const forgotProcess = () => history.push('/forgot')

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign in to continue</h1>
        <input
          name="email"
          placeholder="E-mail"
          type="text"
          ref={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {_.get('email.type', errors) === 'required' && <p>This field is required</p>}
        {_.get('email.type', errors) === 'pattern' && <p>Invalid e-mail adress</p>}

        <div className={styles.psw_wrapper}>
          <input
            name="password"
            placeholder="Password"
            ref={register({
              required: true,
              minLength: {
                value: 8,
                message: 'Min length 8 symbols',
              },
            })}
          />
          <span className={styles.forgot} onClick={forgotProcess}>
            FORGOT?
          </span>
        </div>
        {_.get('password.type', errors) === 'required' && <p>This field is required</p>}
        {_.get('password.type', errors) === 'minLength' && <p>Min length 8 symbols</p>}

        <input type="submit" value="SIGN IN" />
      </form>
      <div className={styles.register}>
        <p>Do not have account? </p>
        <Link to="/signup">
          <span className={styles.suggest}>REGISTER NOW</span>
        </Link>
      </div>
    </div>
  )
}

Login.propTypes = {
  data: T.string,
}

export default Login
