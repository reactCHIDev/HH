/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import desktop from 'routing/PATHS'
import { getItem } from 'utils/localStorage'

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, authorized, ...rest } = this.props
    if (!authorized) {
      return <Redirect exact from="/" to={desktop.home} />
    }

    // if (process.env.NODE_ENV !== 'development' && process.env.REACT_APP_STAGE !== 'development') {
    //   const username = getItem('username')

    //   todo: needed logic for path checking
    // }

    return (
      <>
        <Route {...rest} render={(props) => <Component {...props} />} />
      </>
    )
  }
}

export default connect(({ login: { authorized } }) => ({
  authorized,
}))(PrivateRoute)
