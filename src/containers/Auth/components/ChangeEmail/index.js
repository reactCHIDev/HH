import React from 'react'
import T from 'prop-types'
import * as jwt from 'jsonwebtoken'
import { replace } from 'connected-react-router'
import { connect } from 'react-redux'
import { emailConfirm } from 'actions/account'
import Tint from 'components/Tint'
import PATHS from 'api/paths'

const ChangeEmail = (props) => {
  console.log('%c   ChangeEmail process   ', 'color: darkgreen; background: palegreen;')
  const { token, url, req, err, athorized, close, emailConfirm, invalidLink, replace } = props
  const jwtData = token ? jwt.decode(token, process.env.REACT_APP_JWT_SECRET_KEY) : null
  const valid = jwtData ? new Date().getTime() < new Date(jwtData?.exp * 1000) : true

  if (!valid) {
    invalidLink('Your link is expired!!!')
    close()
  }

  if (valid && athorized) {
    const payload = {
      updateEmailLink: PATHS.url + url,
      newEmail: jwtData.email,
    }
    emailConfirm(payload)
  }

  replace('/login/regular')

  return <Tint />
}

ChangeEmail.propTypes = {
  close: T.func,
  replace: T.func,
  token: T.string,
  url: T.string,
  req: T.bool,
  err: T.string,
  athorized: true.bool,
  emailConfirm: T.func,
}

export default connect(
  ({ router, account }) => ({
    url: router.location.pathname,
    err: account.error,
    athorized: account.authorized,
  }),
  {
    emailConfirm,
    replace,
  },
)(ChangeEmail)
