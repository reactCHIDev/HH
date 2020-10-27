import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Checkmail from 'assets/images/checkmail.svg'
import _ from 'lodash/fp'
import T from 'prop-types'
import styles from './checkmail.module.scss'

const EnterMail = ({ close }) => {
  const { register, handleSubmit, errors } = useForm()

  const backToLogin = () => {
    if (typeof close === 'function') close()
  }

  const onSubmit = (data) => {
    console.log('email', data)
  }

  return (
    <div className={styles.content}>
      <img src={Checkmail} alt="chk" className={styles.img} />
      <p className={styles.header}>Check mail</p>
      <p className={styles.text}>Enter the new password in the sign-in window</p>
      <button type="button">go to sign-in</button>
    </div>
  )
}

EnterMail.propTypes = {
  close: T.func,
}

export default EnterMail
