/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
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
import { setBaseEndpoint } from 'utils/apiClient'
import { history } from 'store'

/* COMPONENTS */
import ScrollToTop from 'components/ScrollToTop'
import PublicRoute from 'components/Routing/PublicRoute'
import PrivateRoute from 'components/Routing/PrivateRoute'
import ConnectionProvider from 'components/ConnectionProvider'
import Header from 'components/Header'

/* PAGES */
import Home from 'pages/HomePage'
import AdminPage from 'pages/Admin'
import Create from 'containers/Auth/components/Forgot/components/Create'

import './App.less'
import './App.css'
import 'styles/styles.scss'
import styles from './app.module.scss'

/* CONTAINERS */
// Auth
const Login = lazy(() => import('containers/Auth/components/Login'))
const Signup = lazy(() => import('containers/Auth/components/Signup'))
const SignupFlow = lazy(() => import('containers/Auth/components/SignupFlow'))
const Forgot = lazy(() => import('containers/Auth/components/Forgot'))

// Foodlover dashboard
const AccountInfo = lazy(() => import('containers/AccountInfo'))
const OrderInfo = lazy(() => import('containers/AccountInfo/OrderInfo'))

// Public pages
const ProductPage = lazy(() => import('pages/ProductPage'))
const ShopPage = lazy(() => import('pages/ShopPage'))
const ProductExplore = lazy(() => import('pages/ProductExplore'))
const FoodmakersExplore = lazy(() => import('pages/FoodmakersExplore'))
const FoodmakerPage = lazy(() => import('pages/FoodmakerPage'))
const ExploreExp = lazy(() => import('pages/ExploreExperiences'))
const Messages = lazy(() => import('pages/Messages'))

// Landing
const FoodmakersLanding = lazy(() => import('landings/Foodmakers'))
const CreateProfileLanding = lazy(() => import('landings/CreateProfile'))
const CreateExperienceLanding = lazy(() => import('landings/CreateExperience'))
const CreateShopLanding = lazy(() => import('landings/CreateShop'))

// Product dashboard
const PrdocutDashboard = lazy(() => import('containers/ProductDashboard'))
const AddProduct = lazy(() => import('containers/ProductDashboard/components/AddProduct'))
const OrderFMInfo = lazy(() => import('containers/ProductDashboard/components/OrderFMInfo'))

// Other
const CartPage = lazy(() => import('containers/Cart'))
const Settings = lazy(() => import('containers/Settings'))
const PageNotFound = lazy(() => import('components/PageNotFound'))

function WaitingComponent(Component) {
  return (props) => (
    <Suspense
      fallback={
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
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

function App({ authorized, role, pathname, getUserAccount }) {
  useEffect(() => {
    const id = getItem('user-id')
    if (authorized && id) getUserAccount(id)
  }, [authorized])

  const url = `${process.env.REACT_APP_BASE_URL}/api`
  setBaseEndpoint(url)

  const hideHeader = ['/signupflow', '/admin'].includes(pathname)

  // console.log('%c   NODE_ENV =   ', 'color: white; background: royalblue;', process.env.NODE_ENV)

  return (
    <div className={styles.app_container} id="app-container">
      <ConnectedRouter history={history}>
        <ConnectionProvider>
          {!hideHeader && <Header />}
          <ScrollToTop>
            <Switch>
              {/* Login */}
              <PublicRoute exact path="/" component={Home} />
              <PublicRoute exact path="/signupflow" component={WaitingComponent(SignupFlow)} />
              <PublicRoute
                exact
                path="/login"
                component={() => <Redirect exact to="/login/regular" />}
              />
              <PublicRoute exact path="/login/:step" component={WaitingComponent(Login)} />
              <PublicRoute exact path="/signup" component={WaitingComponent(Signup)} />
              <PublicRoute exact path="/forgot" component={WaitingComponent(Forgot)} />
              <PublicRoute exact path="/forgotpassword/:user" component={Create} />

              {/* Landings */}
              <PublicRoute
                exact
                path="/landing/foodmakers"
                component={WaitingComponent(() => (
                  <FoodmakersLanding role={role} />
                ))}
              />
              <PublicRoute
                exact
                path="/product_dashboard/:activeTab?"
                component={WaitingComponent(PrdocutDashboard)}
              />
              <PublicRoute
                exact
                path="/landing/create_profile"
                component={WaitingComponent(() => (
                  <CreateProfileLanding role={role} />
                ))}
              />
              <PublicRoute
                exact
                path="/landing/create_experience"
                component={WaitingComponent(() => (
                  <CreateExperienceLanding role={role} />
                ))}
              />
              <PublicRoute
                exact
                path="/landing/create_shop"
                component={WaitingComponent(() => (
                  <CreateShopLanding role={role} />
                ))}
              />

              {/* Pages */}
              <PublicRoute exact path="/shop/:shopName" component={WaitingComponent(ShopPage)} />
              <PublicRoute exact path="/messages" component={WaitingComponent(Messages)} />
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
              <PublicRoute exact path="/cart" component={WaitingComponent(CartPage)} />
              <PrivateRoute exact path="/addproduct" component={WaitingComponent(AddProduct)} />
              <PublicRoute
                exact
                path="/product/:productId?"
                component={WaitingComponent(ProductPage)}
              />
              <PrivateRoute
                exact
                path="/account_info/:activeTab?"
                component={WaitingComponent(AccountInfo)}
              />
              <PrivateRoute exact path="/order_info" component={WaitingComponent(OrderInfo)} />
              <PrivateRoute exact path="/fm_order_info" component={WaitingComponent(OrderFMInfo)} />
              <PublicRoute
                exact
                path="/foodmaker_page/:id"
                component={WaitingComponent(FoodmakerPage)}
              />
              <PrivateRoute
                exact
                path="/settings/:activeTab?/:confirmation?"
                component={WaitingComponent(Settings)}
              />
              <PrivateRoute exact path="/admin" component={AdminPage} />
              <PublicRoute exact path="/:userName" component={WaitingComponent(FoodmakerPage)} />
              <Route path="/*" component={WaitingComponent(PageNotFound)} />
            </Switch>
          </ScrollToTop>
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
    account: { role },
  }) => ({
    pathname,
    authorized,
    role,
  }),
  { getUserAccount },
)(App)
