/* REACT */
import React, { Suspense, lazy } from 'react'
import T from 'prop-types'

/* MODULES */
import { Switch, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Spin, Space } from 'antd'
import { getSuperAdmin } from 'api/requests/Account/index'
import * as jwt from 'jsonwebtoken'

/* CUSTOM MODULES */
import PublicRoute from 'components/Routing/PublicRoute'
import PrivateRoute from 'components/Routing/PrivateRoute'
import ConnectionProvider from 'components/ConnectionProvider'
import { history } from 'store'
import { setBaseEndpoint } from 'utils/apiClient'
import Create from 'containers/Auth/components/Forgot/components/Create'
import Card from 'components/Card'
import Test from 'components/Tabs/Test'
import Home from 'pages/Home'
import Header from 'components/Header'
import desktop from 'routing/PATHS'
import styles from './app.module.scss'
import 'styles/styles.scss'
import './App.less'

const PageNotFound = lazy(() => import('components/PageNotFound'))
const Login = lazy(() => import('containers/Auth/components/Login'))
const Signup = lazy(() => import('containers/Auth/components/Signup'))
const SignupFlow = lazy(() => import('containers/Auth/components/SignupFlow'))
const Forgot = lazy(() => import('containers/Auth/components/Forgot'))
const FoodmakersLanding = lazy(() => import('landings/Foodmakers'))
const CreateProfileLanding = lazy(() => import('landings/CreateProfile'))
const CreateExperienceLanding = lazy(() => import('landings/CreateExperience'))
const CreateShopLanding = lazy(() => import('landings/CreateShop'))

function WaitingComponent(Component) {
  return (props) => (
    <Suspense
      fallback={
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  )
}

function App({ pathname }) {
  const url = process.env.REACT_APP_BASE_URL
  setBaseEndpoint(url)

  const token = jwt.sign({ email: 'postbox32@gmail.com' }, 'secret', { expiresIn: '24h' })
  console.log('token', token)
  const decoded = jwt.decode(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBvc3Rib3gzMkBnbWFpbC5jb20iLCJpYXQiOjE2MDM4Mjc3NjUsImV4cCI6MTYwMzkxNDE2NX0.RAHtvPlhELcu8q5E1XEuzEhiYGa8ZQGPfeMN9GruwZQ',
    'secret',
  )
  console.log('decoded', new Date(decoded.exp * 1000))

  return (
    <div className={styles.container}>
      <ConnectedRouter history={history}>
        <ConnectionProvider>
          {pathname !== '/signupflow' && <Header />}
          <Switch>
            <PublicRoute exact path={desktop.home} component={WaitingComponent(Home)} />
            <PublicRoute
              exact
              path="/login"
              component={() => <Redirect exact to="/login/regular" />}
            />
            <PublicRoute exact path={desktop.login} component={WaitingComponent(Login)} />
            <PublicRoute exact path={desktop.signup} component={WaitingComponent(Signup)} />
            <PublicRoute exact path={desktop.signupflow} component={WaitingComponent(SignupFlow)} />
            <PublicRoute exact path={desktop.forgot} component={WaitingComponent(Forgot)} />
            <PublicRoute
              exact
              path="/landing/foodmakers"
              component={WaitingComponent(FoodmakersLanding)}
            />
            <PublicRoute
              exact
              path="/landing/create_profile"
              component={WaitingComponent(CreateProfileLanding)}
            />
            <PublicRoute
              exact
              path="/landing/create_experience"
              component={WaitingComponent(CreateExperienceLanding)}
            />
            <PublicRoute
              exact
              path="/landing/create_shop"
              component={WaitingComponent(CreateShopLanding)}
            />
            <PublicRoute exact path="/tabs" component={() => <Test />} />
            <PublicRoute exact path="/forgotpassword/:user" component={Create} />
            <PrivateRoute exact path={desktop.card} component={WaitingComponent(Card)} />
            <Route exact path={desktop.card} component={Card} />
            <Route path={desktop.test} component={() => <div>"/test" routing successful</div>} />
            <Route path="/*" component={WaitingComponent(PageNotFound)} />
          </Switch>
        </ConnectionProvider>
      </ConnectedRouter>
    </div>
  )
}

App.propTypes = {
  pathname: T.string,
}

export default connect(
  ({
    router: {
      location: { pathname },
    },
  }) => ({
    pathname,
  }),
  null,
)(App)
