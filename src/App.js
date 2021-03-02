/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* REACT */
import React, { useState, useEffect, createContext, Suspense, lazy } from 'react'
import T from 'prop-types'

/* MODULES */
import { Switch, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Spin, Space } from 'antd'

/* CUSTOM MODULES */
import { getUserAccount } from 'actions/account'
import { getItem } from 'utils/localStorage'
import { dispatchMsg } from 'actions/chat'
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

import Soon from 'components/ComingSoon'

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
const ExperiencePage = lazy(() => import('pages/ExperiencePage'))
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

// Foodmaker dashboard
const FoodmakerDashboard = lazy(() => import('containers/FoodmakerDashboard'))

// Product dashboard
const ProductDashboard = lazy(() => import('containers/ProductDashboard'))
const AddProduct = lazy(() => import('containers/ProductDashboard/components/AddProduct'))
const OrderFMInfo = lazy(() => import('containers/ProductDashboard/components/OrderFMInfo'))

// Experience dashboard
const ExperienceDashboard = lazy(() => import('containers/ExperienceDashboard'))
const AddExperience = lazy(() => import('containers/ExperienceDashboard/components/AddExperience'))
const FMBookingInfo = lazy(() => import('containers/ExperienceDashboard/components/FMBookingInfo'))

// Other
const Success = lazy(() => import('pages/Stripe/Cart/Success'))
const Error = lazy(() => import('pages/Stripe/Cart/Error'))
const BookingSuccess = lazy(() => import('pages/Stripe/Booking/Success'))
const BookingError = lazy(() => import('pages/Stripe/Booking/Error'))
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

export const WebSocketContext = createContext(null)

function App({ authorized, role, pathname, getUserAccount, dispatchMsg }) {
  const [socket, setWs] = useState(null)

  useEffect(() => {
    if (authorized) {
      const token = getItem('authorization-token')
      const [, accessToken] = token.split('Bearer ')

      let ws

      const socketOpenListener = () => {
        setWs(ws)
        ws.send(
          JSON.stringify({
            event: 'getNewMessages',
            data: {
              accessToken,
            },
          }),
        )
      }

      const socketMessageListener = (data) => {
        dispatchMsg(ws, data.data)
      }

      const socketCloseListener = () => {
        if (socket) {
          console.error('Disconnected.')
        }
        ws = new WebSocket(
          `${process.env.REACT_APP_WEBSOCKET_BASE_URL}/ws/v1?accessToken=${accessToken}`,
        )
        ws.addEventListener('open', socketOpenListener)
        ws.addEventListener('message', socketMessageListener)
        ws.addEventListener('close', socketCloseListener)
      }

      socketCloseListener()
    }
    if (!authorized && socket) socket.close()
  }, [authorized])

  useEffect(() => {
    const id = getItem('user-id')
    if (authorized && id) getUserAccount(id)
  }, [authorized])

  const url = `${process.env.REACT_APP_BASE_URL}/api`
  setBaseEndpoint(url)

  const hideHeader = ['/signupflow', '/admin'].includes(pathname)

  return (
    <div className={styles.app_container} id="app-container">
      <ConnectedRouter history={history}>
        <ConnectionProvider>
          <WebSocketContext.Provider value={socket}>
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
                  component={WaitingComponent(ProductDashboard)}
                />
                <PublicRoute
                  exact
                  path="/foodmaker_dashboard/:activeTab?"
                  component={WaitingComponent(FoodmakerDashboard)}
                />
                <PublicRoute
                  exact
                  path="/experience_dashboard/:activeTab?"
                  component={WaitingComponent(ExperienceDashboard)}
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
                <PublicRoute exact path="/payment-success" component={WaitingComponent(Success)} />
                <PublicRoute exact path="/payment-error" component={WaitingComponent(Error)} />
                <PublicRoute
                  exact
                  path="/booking-success"
                  component={WaitingComponent(BookingSuccess)}
                />
                <PublicRoute
                  exact
                  path="/booking-error"
                  component={WaitingComponent(BookingError)}
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
                <PrivateRoute exact path="/messages" component={WaitingComponent(Messages)} />
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
                <PrivateRoute
                  exact
                  path="/addexperience"
                  component={WaitingComponent(AddExperience)}
                />
                <PublicRoute
                  exact
                  path="/product/:productId?"
                  component={WaitingComponent(ProductPage)}
                />
                <PublicRoute
                  exact
                  path="/experience/:productId?"
                  component={WaitingComponent(ExperiencePage)}
                />
                <PrivateRoute
                  exact
                  path="/account_info/:activeTab?"
                  component={WaitingComponent(AccountInfo)}
                />
                <PrivateRoute exact path="/order_info" component={WaitingComponent(OrderInfo)} />
                <PrivateRoute
                  exact
                  path="/fm_order_info"
                  component={WaitingComponent(OrderFMInfo)}
                />
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
                <PrivateRoute
                  exact
                  path="/fm_booking_info"
                  component={WaitingComponent(FMBookingInfo)}
                />

                <PrivateRoute exact path="/admin" component={AdminPage} />
                <PublicRoute exact path="/:userName" component={WaitingComponent(FoodmakerPage)} />
                <Route path="/*" component={WaitingComponent(PageNotFound)} />
              </Switch>
            </ScrollToTop>
          </WebSocketContext.Provider>
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
  { getUserAccount, dispatchMsg },
)(App)
