import React from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import * as jwt from 'jsonwebtoken'
import _ from 'lodash/fp'
import PATHS from 'api/paths'
import Tint from 'components/Tint'
import { Link } from 'react-router-dom'
import { signupRequest } from 'actions/signup'
import { getUserByName, getUserByEmail } from 'api/requests/Auth'

import T from 'prop-types'
import styles from './signup.module.scss'

const Signup = ({ signupReq, req }) => {
  const { register, handleSubmit, errors, watch } = useForm()

  const generateLink = (credentials) => {
    const { email } = credentials
    const token = jwt.sign({ email }, process.env.REACT_APP_JWT_SECRET_KEY, { expiresIn: 600 })
    const { url } = PATHS
    return url + '/login/confirmemail' + token
  }

  const onSubmit = (credentials) =>
    signupReq({
      ...credentials,
      role: 'FOODLOVER',
      registrationLink: generateLink(credentials),
    })

  return (
    <div className={styles.container}>
      {req && <Tint />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign up</h1>
        <input
          name="profileName"
          placeholder="Name"
          type="text"
          ref={register({
            validate: async (value) => {
              const name = await getUserByName(value)
              return !name.data?.profileName
            },
            required: true,
            pattern: {
              validate: async (value) => {
                const name = await getUserByName(value)
                return !name.data?.profileName
              },
              value: /^(?=.{1,15}$)[a-zA-Z][a-zA-Z0-9]*(?: [a-zA-Z0-9]+)*$/,
              message: 'Invalid name symbols',
            },
          })}
        />
        {_.get('profileName.type', errors) === 'required' && <p>This field is required</p>}
        {_.get('profileName.type', errors) === 'pattern' && <p>Invalid symbols</p>}
        {_.get('profileName.type', errors) === 'validate' && <p>User name already exist</p>}

        <input
          name="email"
          placeholder="E-mail"
          type="text"
          ref={register({
            validate: async (value) => {
              const name = await getUserByEmail(value.replace('@', '%40'))
              return !name.data?.email
            },
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {_.get('email.type', errors) === 'required' && <p>This field is required</p>}
        {_.get('email.type', errors) === 'pattern' && <p>Invalid e-mail adress</p>}
        {_.get('email.type', errors) === 'validate' && <p>E-mail adress already exist</p>}
        <input
          name="password"
          placeholder="Password"
          ref={register({
            required: true,
            pattern: {
              value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
            },
          })}
        />
        {_.get('password.type', errors) === 'required' && <p>This field is required</p>}
        {_.get('password.type', errors) === 'pattern' && <p>Letters, numbers, length 8 symbols</p>}
        <input
          name="confirm"
          placeholder="Confirm password"
          ref={register({
            validate: (value) => value === watch('password'),
          })}
        />
        {_.get('confirm.type', errors) === 'required' && <p>This field is required</p>}
        {_.get('confirm.type', errors) === 'validate' && <p>Passwords don't match</p>}

        <input type="submit" value="SIGN UP" />
      </form>
      <div className={styles.register}>
        <p>Already have an account? </p>
        <Link to="/login">
          <span className={styles.suggest}>SIGN IN</span>
        </Link>
      </div>
    </div>
  )
}

Signup.propTypes = {
  signupReq: T.func,
  req: T.bool,
}

export default connect(({ signup: { requesting: req } }) => ({ req }), {
  signupReq: signupRequest,
})(Signup)
