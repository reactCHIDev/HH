import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { passwordRequest } from 'actions/forgot'
import EnterMail from './components/EnterMail'
import CheckMail from './components/CheckMail'
import Create from './components/Create'
import ToSignin from './components/ToSignin'
import styles from './forgot.module.scss'

const Forgot = (props) => {
  const { passwordRequest } = props
  const onSubmit = (data) => {
    passwordRequest(data.email)
  }

  return (
    <div className={styles.container}>
      <EnterMail onSubmit={onSubmit} />
      {/* <CheckMail /> */}
      {/* <Create /> */}
      {/* <ToSignin /> */}
    </div>
  )
}

Forgot.propTypes = {
  passwordRequest: T.func,
}

export default connect(null, { passwordRequest })(Forgot)
