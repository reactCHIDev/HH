/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { getItem } from 'utils/localStorage'

class PublicRoute extends React.Component {
  render() {
    const { component: Component, /* authorized, foundedUser, */ ...rest } = this.props
    // const username = getItem('username')

    // if (authorized && username) {
    //   if (process.env.NODE_ENV !== 'development' && process.env.REACT_APP_STAGE !== 'development') {
    //     return <Redirect exact from="/" to={`/${username}`} />
    //   }
    //   // todo temporary solution only for local development
    //   if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_STAGE === 'development') {
    //     return (
    //       <>
    //         <Redirect exact from="/" to={`/${username}`} />
    //         <Route {...rest} render={(props) => <Component {...props} />} />
    //       </>
    //     )
    //   }

    //   // return <Redirect exact from="/" to={desktop.withAuth.main} />
    //   return (
    //     <>
    //       {/* <Redirect exact from="/" to={`/${foundedUser || username}`} /> */}
    //       <Route {...rest} render={(props) => <Component {...props} />} />
    //     </>
    //   )
    // }

    return <Route {...rest} render={(props) => <Component {...props} />} />
  }
}

export default connect(({ newLogin, searchUser }) => ({
  // authorized: newLogin.authorized,
  // foundedUser: searchUser.foundUser?.username,
}))(PublicRoute)
