import React from 'react'
import { useForm } from 'react-hook-form'
import _ from 'lodash/fp'
import { Link } from 'react-router-dom'
import { history } from 'store'

import T from 'prop-types'
import styles from './signup.module.scss'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Signup = ({ data }) => {
  const { register, handleSubmit, errors, watch, formState } = useForm()

  const onSubmit = async (data) => {
    // await sleep(2000)
    console.log(data)
  }

  const forgotProcess = () => history.push('/forgot')

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign up</h1>
        <input
          name="name"
          placeholder="Name"
          type="text"
          ref={register({
            required: true,
            pattern: {
              value: /^(?=.{1,15}$)[a-zA-Z][a-zA-Z0-9]*(?: [a-zA-Z0-9]+)*$/,
              message: 'Invalid name symbols',
            },
          })}
        />
        {_.get('name.type', errors) === 'required' && <p>This field is required</p>}
        {_.get('name.type', errors) === 'pattern' && <p>Invalid symbols</p>}

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
        {_.get('password.type', errors) === 'required' && <p>This field is required</p>}
        {_.get('password.type', errors) === 'minLength' && <p>Min length 8 symbols</p>}
        <input
          name="confirm"
          placeholder="Confirm password"
          ref={register({
            validate: (value) => value === watch('password'),
          })}
        />
        {_.get('confirm.type', errors) === 'required' && <p>This field is required</p>}
        {_.get('confirm.type', errors) === 'minLength' && <p>Min length 8 symbols</p>}
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
  data: T.string,
}

export default Signup
