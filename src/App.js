/* REACT */
import React, { Suspense, lazy } from 'react'
import { string, bool } from 'prop-types'

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
import Auth from 'containers/Auth'
import Forgot from 'containers/Auth/components/Login/Forgot'
import desktop from 'routing/PATHS'
import styles from './app.module.scss'
import './App.less'

const PageNotFound = lazy(() => import('components/PageNotFound'))
const LoginFlow = lazy(() => import('containers/Auth'))

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
  const url =
    process.env.NODE_ENV !== 'development' && process.env.REACT_APP_STAGE !== 'development'
      ? process.env.REACT_APP_URL_V3
      : process.env.REACT_APP_BASE_URL_V3

  setBaseEndpoint(url)
  return (
    <div className={styles.container}>
      <ConnectedRouter history={history}>
        <ConnectionProvider>
          <Switch>
            <PublicRoute exact path={desktop.card} component={WaitingComponent(Card)} />
            <PublicRoute exact path={desktop.login} component={WaitingComponent(LoginFlow)} />
            <PublicRoute exact path={desktop.forgot} component={WaitingComponent(Forgot)} />
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
  data: string,
}

export default connect(({ test: { data } }) => ({ data }), null)(App)
