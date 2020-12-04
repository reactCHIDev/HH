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
  })

export default createRootReducer
