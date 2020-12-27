import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import connection from './connection'

import signup from './signup'
import login from './login'
import account from './account'
import listing from './listing'
import foodmaker from './foodmaker'
import product from './product'
import system from './system'
import shop from './shop'
import pages from './pages'
import cart from './cart'
import fmOrders from './foodmaker_orders'
import flOrders from './foodlover_orders'
import stripe from './stripe'
import billingHistory from './billing_history'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    signup,
    login,
    account,
    listing,
    connection,
    foodmaker,
    product,
    system,
    shop,
    pages,
    cart,
    fmOrders,
    flOrders,
    stripe,
    billingHistory,
  })

export default createRootReducer
