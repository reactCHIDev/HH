import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { history } from 'store'
import _ from 'lodash/fp'
import T from 'prop-types'
import styles from './forgot.module.scss'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Forgot = ({ data }) => {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, errors, formState } = useForm()
  const onSubmit = async (data) => {
    await sleep(2000)
    setSent(true)
  }

  const backToLogin = () => {
    history.push('/login')
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!sent ? (
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
        ) : (
          <div className={styles.msg}>
            <p>An email has been sent if the given address exists</p>
            <input type="button" value="OK" onClick={backToLogin} />
          </div>
        )}
      </div>
    </div>
  )
}

Forgot.propTypes = {
  data: T.string,
}

export default Forgot
