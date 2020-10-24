import { put, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { login as loginRequest, logout as logoutRequest } from 'api/requests/Auth'
import { removeItems, setItems } from '../utils/localStorage'
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  // SET_USER,
  REMOVE_USER,
} from '../actions/constants'

export function* logout() {
  logoutRequest()

  // yield put({ type: REMOVE_USER })
  removeItems(['authorization-token', 'user-id'])
  yield put(push('/'))
}

function* loginFlow({ creds }) {
  try {
    console.log('creds', creds)
    const { data, headers } = yield loginRequest(creds)
    const localData = [
      { key: 'authorization-token', value: headers.authorization },
      { key: 'user-id', value: data.id },
    ]

    yield setItems(localData)

    yield put({ type: LOGIN_SUCCESS })
    yield put(push('/card'))
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error })
  }
}

// function* loginSuccess() {
//   yield put(push('/'))
// }

function* loginWatcher() {
  yield takeLatest(LOGIN_REQUESTING, loginFlow)
  yield takeEvery(LOGOUT, logout)
  // yield takeEvery(LOGIN_SUCCESS, loginSuccess)
}

export default loginWatcher
