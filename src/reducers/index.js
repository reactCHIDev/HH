import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import connection from './connection'

import signup from './signup'
import login from './login'
import account from './account'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    signup,
    login,
    account,
    connection,
  })

export default createRootReducer
