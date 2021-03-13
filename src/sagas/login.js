import { put, takeLatest, takeEvery } from 'redux-saga/effects'
import { push, replace } from 'connected-react-router'
import { login as loginRequest, logout as logoutRequest } from 'api/requests/Auth'
import { getItem, removeItems, setItems } from '../utils/localStorage'
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  GET_USER_ACCOUNT_REQUESTING,
} from '../actions/constants'

export function* logout() {
  logoutRequest()
  removeItems([
    'authorization-token',
    'user-id',
    'user-name',
    'cart',
    'search_data',
    'loginFromCart',
    'signup_data',
    'step',
    'link',
    'booking',
    'sessionId',
    'search_data_results',
  ])
  yield put({ type: 'CLEAR_ON_LOGOUT' })
  yield put({ type: 'CLEAR_CART' })
  yield put({ type: 'CLEAR_REVIEWS_OPTION' })

  yield put(push('/login/regular'))
}

function* loginFlow({ creds }) {
  const { redirect } = creds
  const isLoginFromCart = getItem('loginFromCart')
  delete creds.redirect
  try {
    const { data, headers } = yield loginRequest(creds)

    const localData = [
      { key: 'authorization-token', value: headers.authorization },
      { key: 'user-id', value: data.id },
      { key: 'user-name', value: data.profileName },
    ]
    yield setItems(localData)
    yield put({
      type: LOGIN_SUCCESS,
      payload: { name: data.profileName, id: data.id, role: data.role },
    })
    yield put({ type: GET_USER_ACCOUNT_REQUESTING })
    if (isLoginFromCart) {
      yield put(push('/cart'))
    } else if (redirect) {
      yield put(replace('/'))
    }
  } catch (error) {
    if (error.response) {
      yield put({ type: LOGIN_ERROR, error: error.response.data.error })
    }
  }
}

function* loginWatcher() {
  yield takeLatest(LOGIN_REQUESTING, loginFlow)
  yield takeEvery(LOGOUT, logout)
}

export default loginWatcher
