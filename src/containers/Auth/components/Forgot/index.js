import React from 'react'
import T from 'prop-types'
import * as jwt from 'jsonwebtoken'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { passwordRequest, passwordCreate } from 'actions/forgot'
import EnterMail from './components/EnterMail'
import CheckMail from './components/CheckMail'
import Create from './components/Create'
import ToSignin from './components/ToSignin'
import styles from './forgot.module.scss'

const Forgot = (props) => {
  const { passwordRequest, passwordCreate, step, token, url, close, push } = props
  console.log('%c   props   ', 'color: darkgreen; background: palegreen;', props.params)

  console.log('%c   token   ', 'color: white; background: blue;', token)

  const jwtData = token ? jwt.decode(token, 'secret') : null
  const valid = jwtData ? new Date().getTime() < new Date(jwtData?.exp * 1000) : true
  if (!valid) {
    close()
    alert('Your link is expired. Try to restore password again.')
  }

  console.log('jwtData', jwtData)
  console.log('valid', valid)

  const onEmail = (data) => {
    passwordRequest(data.email)
  }

  const onPasswordCreate = (submitData) => {
    const payload = {
      secretLink: 'localhost:3000' + url,
      email: jwtData.email,
      password: submitData.password,
    }
    passwordCreate(payload)
  }

  return (
    <div className={styles.container}>
      {step == 1 && <EnterMail onSubmit={onEmail} />}
      {step == 2 && <CheckMail close={close} />}
      {step == 3 && valid && <Create onSubmit={onPasswordCreate} />}
      {step == 4 && <ToSignin close={close} />}
    </div>
  )
}

Forgot.propTypes = {
  passwordRequest: T.func,
  passwordCreate: T.func,
  close: T.func,
  push: T.func,
  step: T.number,
  token: T.string,
  url: T.string,
}

export default connect(({ router }) => ({ url: router.location.pathname }), {
  passwordRequest,
  passwordCreate,
  push,
})(Forgot)
