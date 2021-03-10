import { getDefaultMiddleware } from 'redux-starter-kit'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { applyMiddleware, createStore } from 'redux'
import createRootReducer from 'reducers'

export const history = createBrowserHistory()

export const sagaMiddleware = createSagaMiddleware()

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
  routerMiddleware(history),
  sagaMiddleware,
]

function configStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(...middleware))
      : applyMiddleware(...middleware),
  )
  return store
}

const store = configStore({})

export default store
