import React from 'react'
import Login from 'containers/Auth/components/Login'
import T from 'prop-types'
import s from './auth.module.scss'

const Auth = ({ data }) => (
  <div className={s.container}>
    <div className={s.content}>
      <Login />
    </div>
  </div>
)

Auth.propTypes = {
  data: T.string,
}

export default Auth
