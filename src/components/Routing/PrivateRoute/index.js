import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import T from 'prop-types'
import desktop from 'routing/PATHS'

function PrivateRoute(props) {
  const { component: Component, authorized, ...rest } = props

  if (!authorized) {
    return <Redirect exact to={desktop.login} />
  }

  return (
    <>
      <Route {...rest} render={(props) => <Component {...props} />} />
    </>
  )
}

PrivateRoute.propTypes = {
  component: T.node,
  authorized: T.bool,
}

export default connect(({ login: { authorized } }) => ({
  authorized,
}))(PrivateRoute)
