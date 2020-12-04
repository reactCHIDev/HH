/* REACT */
import React, { useEffect, Suspense, lazy } from 'react'
import T from 'prop-types'

/* MODULES */
import { Switch, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Spin, Space } from 'antd'

/* CUSTOM MODULES */
import { getUserAccount } from 'actions/account'
import { getItem } from 'utils/localStorage'

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
import './App.less'
import './App.css'
import 'styles/styles.scss'

const PageNotFound = lazy(() => import('components/PageNotFound'))
const Login = lazy(() => import('containers/Auth/components/Login'))
const Signup = lazy(() => import('containers/Auth/components/Signup'))
const SignupFlow = lazy(() => import('containers/Auth/components/SignupFlow'))
const Forgot = lazy(() => import('containers/Auth/components/Forgot'))
const Account = lazy(() => import('containers/Dashboard/components/Account'))
const AddProduct = lazy(() => import('containers/Dashboard/components/Account/AddProduct'))
const ProductPage = lazy(() => import('containers/Dashboard/components/Account/ProductPage'))
const ShopPage = lazy(() => import('pages/ShopPage'))
const ExploreExp = lazy(() => import('pages/ExploreExperiences'))
const ProductExplore = lazy(() => import('pages/ProductExplore'))
const FoodmakersExplore = lazy(() => import('pages/FoodmakersExplore'))
const FoodmakerPage = lazy(() => import('containers/Dashboard/components/Account/FoodmakerPage'))
const FoodmakerProfile = lazy(() =>
  import('containers/Dashboard/components/Account/FoodmakerProfile'),
)
const ShopProfile = lazy(() => import('containers/Dashboard/components/Account/ShopProfile'))
const Settings = lazy(() => import('containers/Dashboard/components/Account/Settings'))
const FoodmakersLanding = lazy(() => import('landings/Foodmakers'))
const CreateProfileLanding = lazy(() => import('landings/CreateProfile'))
const CreateExperienceLanding = lazy(() => import('landings/CreateExperience'))
const CreateShopLanding = lazy(() => import('landings/CreateShop'))
const Sandbox = lazy(() => import('components/sandbox/wrapper'))

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

function App({ authorized, pathname, getUserAccount }) {
  useEffect(() => {
    const id = getItem('user-id')
    if (authorized && id) getUserAccount(id)
  }, [authorized])

  const url = `${process.env.REACT_APP_BASE_URL}/api`
  setBaseEndpoint(url)

  const hideHeader = ['/signupflow'].includes(pathname)

  return (
    <div className={styles.app_container} id="app-container">
      <ConnectedRouter history={history}>
        <ConnectionProvider>
          {!hideHeader && <Header />}
          <Switch>
            <PublicRoute exact path={desktop.home} component={WaitingComponent(Home)} />
            <PublicRoute
              exact
              path="/login"
              component={() => <Redirect exact to="/login/regular" />}
            />
            <PublicRoute exact path="/sandbox" component={WaitingComponent(Sandbox)} />
            <PublicRoute exact path={desktop.login} component={WaitingComponent(Login)} />
            <PublicRoute exact path={desktop.signup} component={WaitingComponent(Signup)} />
            <PublicRoute exact path={desktop.signupflow} component={WaitingComponent(SignupFlow)} />
            <PublicRoute exact path={desktop.forgot} component={WaitingComponent(Forgot)} />

            {/* Pages */}
            <PublicRoute exact path="/shop_page" component={WaitingComponent(ShopPage)} />
            <PublicRoute
              exact
              path="/explore_experiences"
              component={WaitingComponent(ExploreExp)}
            />
            <PublicRoute
              exact
              path="/product_explore"
              component={WaitingComponent(ProductExplore)}
            />
            <PublicRoute
              exact
              path="/foodmakers_explore"
              component={WaitingComponent(FoodmakersExplore)}
            />
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
            <PublicRoute exact path="/forgotpassword/:user" component={Create} />
            <PrivateRoute exact path={desktop.card} component={WaitingComponent(Card)} />
            <PrivateRoute exact path={desktop.profile} component={WaitingComponent(Account)} />
            <PrivateRoute exact path="/addproduct" component={WaitingComponent(AddProduct)} />
            <PrivateRoute exact path="/product_page" component={WaitingComponent(ProductPage)} />
            <PrivateRoute
              exact
              path="/foodmaker_profile"
              component={WaitingComponent(FoodmakerProfile)}
            />
            <PrivateRoute exact path="/shop_profile" component={WaitingComponent(ShopProfile)} />
            <PrivateRoute
              exact
              path="/foodmaker_page"
              component={WaitingComponent(FoodmakerPage)}
            />
            <PrivateRoute
              exact
              path="/settings/:confirmation"
              component={WaitingComponent(Settings)}
            />
            <Route exact path={desktop.card} component={Card} />
            <Route path="/*" component={WaitingComponent(PageNotFound)} />
          </Switch>
        </ConnectionProvider>
      </ConnectedRouter>
    </div>
  )
}

App.propTypes = {
  pathname: T.string.isRequired,
  authorized: T.bool.isRequired,
  getUserAccount: T.func.isRequired,
}

export default connect(
  ({
    router: {
      location: { pathname },
    },
    login: { authorized },
  }) => ({
    pathname,
    authorized,
  }),
  { getUserAccount },
)(App)
