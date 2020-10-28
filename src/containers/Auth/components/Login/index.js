import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import _ from 'lodash/fp'
import { Link, useParams } from 'react-router-dom'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import Modal from 'components/UniversalModal'
import Forgot from 'containers/Auth/components/Forgot'
import { loginRequest } from 'actions/login'

import T from 'prop-types'
import styles from './login.module.scss'

const Login = (props) => {
  const { loginRequest, push } = props
  const { step } = useParams()

  const steps = new Set(['forgotstep1', 'forgotstep2', 'forgotstep3', 'forgotstep4'])
  const isForgotRoute = steps.has(step.substring(0, 11))
  let forgotStep = ''
  let token = ''
  if (isForgotRoute) {
    forgotStep = Number(step.substring(10, 11))
    if (forgotStep === 3) {
      token = step.substring(11)
    }
  }
  console.log('%c   isForgotRoute   ', 'color: white; background: salmon;', isForgotRoute)
  console.log('%c   forgotStep   ', 'color: white; background: salmon;', forgotStep)

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (credentials) => {
    loginRequest(credentials)
  }

  const forgotProcess = () => {
    push('/login/forgotstep1')
  }

  const forgotClose = () => {
    push('/login/regular')
  }

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
            type="text"
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
      {isForgotRoute && (
        <Modal closeFunc={forgotClose} mode="dark">
          <Forgot step={forgotStep} close={forgotClose} token={token} />
        </Modal>
      )}
    </div>
  )
}

Login.propTypes = {
  loginRequest: T.func,
  push: T.func,
}

export default connect(null, { loginRequest, push })(Login)
