import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import T from 'prop-types'

const PrivateRouteContainer = (props) => {
  const { authorized, component: Component, ...restProps } = props
  return (
    <Route
      {...restProps}
      component={() => (authorized ? <Component /> : <Redirect to="/login" />)}
    />
  )
}

PrivateRouteContainer.propTypes = {
  authorized: T.bool,
  component: T.func,
}

export default connect(({ login: { authorized } }) => ({
  authorized,
}))(PrivateRouteContainer)
