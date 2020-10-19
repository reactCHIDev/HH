import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import connection from './connection'

import login from './login'
import test from './test'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    login,
    test,
    connection,
  })

export default createRootReducer
