import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store, { sagaMiddleware } from './store'
import rootSaga from './sagas/root-saga'
import App from './App'
import * as serviceWorker from './serviceWorker'

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
