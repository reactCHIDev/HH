import React from 'react'
import T from 'prop-types'
import * as jwt from 'jsonwebtoken'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { passwordRequest, passwordCreate } from 'actions/forgot'
import Tint from 'components/Tint'
import PATHS from 'api/paths'
import EnterMail from './components/EnterMail'
import CheckMail from './components/CheckMail'
import Create from './components/Create'
import ToSignin from './components/ToSignin'
import styles from './forgot.module.scss'

const Forgot = (props) => {
  const {
    passwordRequest,
    passwordCreate,
    step,
    token,
    url,
    req,
    err,
    close,
    invalidLink,
    push,
  } = props
  const jwtData = token ? jwt.decode(token, 'secret') : null
  const valid = jwtData ? new Date().getTime() < new Date(jwtData?.exp * 1000) : true
  if (!valid) invalidLink()

  const onEmail = (data) => {
    passwordRequest(data.email)
  }

  const onPasswordCreate = (submitData) => {
    const payload = {
      secretLink: PATHS.url + url,
      email: jwtData.email,
      password: submitData.password,
    }
    passwordCreate(payload)
    close()
  }

  return (
    <div className={styles.container}>
      {req && <Tint />}
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
  req: T.bool,
  err: T.string,
}

export default connect(
  ({ router, login }) => ({
    url: router.location.pathname,
    req: login.requesting,
    err: login.error,
  }),
  {
    passwordRequest,
    passwordCreate,
    push,
  },
)(Forgot)
