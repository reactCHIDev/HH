/* eslint-disable no-shadow */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import T from 'prop-types'

function PrivateRoute(props) {
  const { component: Component, authorized, ...rest } = props

  if (!authorized) {
    return <Redirect exact to="/login/:step" />
  }

  return (
    <>
      <Route {...rest} render={(props) => <Component {...props} />} />
    </>
  )
}

PrivateRoute.propTypes = {
  component: T.elementType,
  authorized: T.bool,
}

export default connect(({ login: { authorized } }) => ({
  authorized,
}))(PrivateRoute)
