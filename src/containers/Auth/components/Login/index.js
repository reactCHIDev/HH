import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import _ from 'lodash/fp'
import { Link, useParams } from 'react-router-dom'
import { push, replace } from 'connected-react-router'
import { connect } from 'react-redux'
import Modal from 'components/UniversalModal'
import Forgot from 'containers/Auth/components/Forgot'
import { loginRequest, loginErrorReset, invalidLink } from 'actions/login'
import Error from 'containers/Auth/components/Forgot/components/Error'
import EyeOpen from 'assets/icons/svg/eye-open.svg'
import EyeClosed from 'assets/icons/svg/eye-closed.svg'
import T from 'prop-types'
import styles from './login.module.scss'

const Login = (props) => {
  const { loginRequest, pushRoute, replaceRoute, error, loginErrorReset, invalidLink } = props
  const { step } = useParams()

  if (step.substring(0, 12) === 'confirmemail') replaceRoute('/login/regular')
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

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (credentials) => {
    loginRequest(credentials)
  }

  const forgotProcess = () => {
    pushRoute('/login/forgotstep1')
  }

  const forgotClose = () => {
    loginErrorReset()
    pushRoute('/login/regular')
  }

  const errorReset = () => {
    loginErrorReset()
    if (error === 'Your link is expired !!!') pushRoute('/login/regular')
  }

  const [type, setType] = useState('password')

  const togglePassword = () => {
    setType(type === 'password' ? 'text' : 'password')
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
            type={type}
            ref={register({
              required: true,
              minLength: {
                value: 8,
                message: 'Min length 8 symbols',
              },
            })}
          />
          <button type="button" className={styles.psw_eye} onClick={togglePassword}>
            <img src={type === 'password' ? EyeOpen : EyeClosed} alt="eye" />
          </button>
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
          <Forgot step={forgotStep} close={forgotClose} invalidLink={invalidLink} token={token} />
        </Modal>
      )}
      {error && (
        <Modal closeFunc={errorReset} mode="dark">
          <Error message={error} close={errorReset} />
        </Modal>
      )}
    </div>
  )
}

Login.propTypes = {
  loginRequest: T.func.isRequired,
  pushRoute: T.func.isRequired,
  replaceRoute: T.func.isRequired,
  loginErrorReset: T.func.isRequired,
  invalidLink: T.func.isRequired,
  error: T.string.isRequired,
}

export default connect(({ login: { error } }) => ({ error }), {
  loginRequest,
  pushRoute: push,
  replaceRoute: replace,
  loginErrorReset,
  invalidLink,
})(Login)
