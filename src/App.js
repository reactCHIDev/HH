/* REACT */
import React, { Suspense, lazy } from 'react'
import T from 'prop-types'

/* MODULES */
import { Switch, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Spin, Space } from 'antd'

/* CUSTOM MODULES */
import PublicRoute from 'components/Routing/PublicRoute'
import PrivateRoute from 'components/Routing/PrivateRoute'
import ConnectionProvider from 'components/ConnectionProvider'
import { history } from 'store'
import { setBaseEndpoint } from 'utils/apiClient'
import Card from 'components/Card'
import Test from 'components/Tabs/Test'
import desktop from 'routing/PATHS'
import styles from './app.module.scss'
import 'styles/styles.scss'
import './App.less'

import store from './store'

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
        <Space size="middle">
          <Spin size="large" />
        </Space>
      }
    >
      <Component {...props} />
    </Suspense>
  )
}

function App(props) {
  const { data } = props
  const url = 'https://hungryhugger.wildwebart.com/api'
  console.log('url', url)
  setBaseEndpoint(url)

  return (
    <div
      // onClick={() => store.dispatch({ type: 'QTEST', payload: '' })}
      className={styles.container}
    >
      <ConnectedRouter history={history}>
        <ConnectionProvider>
          <Switch>
            <PublicRoute exact path={desktop.card} component={WaitingComponent(Card)} />
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
            <Route exact path={desktop.home} component={Card} />
            <Route path={desktop.test} component={() => <div>"/test" routing successful</div>} />
            <Route path="/*" component={WaitingComponent(PageNotFound)} />
          </Switch>
        </ConnectionProvider>
      </ConnectedRouter>
    </div>
  )
}

App.propTypes = {
  data: T.string,
}

export default connect(({ test: { data } }) => ({ data }), null)(App)
