import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import connection from './connection'

import signup from './signup'
import login from './login'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    signup,
    login,
    connection,
  })

export default createRootReducer
