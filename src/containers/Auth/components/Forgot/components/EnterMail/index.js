import React from 'react'
import { useForm } from 'react-hook-form'
import _ from 'lodash/fp'
import T from 'prop-types'
import styles from './entermail.module.scss'

const EnterMail = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm()

  return (
    <div className={styles.content}>
      <p className={styles.header}>Don't worry, we'll restore your password now</p>
      <p className={styles.text}>
        Input the email to which the account is registered, and we will send a link to create a new
        password.
      </p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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

        <input type="submit" value="REQUEST PASSWORD" />
      </form>
    </div>
  )
}

EnterMail.propTypes = {
  onSubmit: T.func,
}

export default EnterMail
