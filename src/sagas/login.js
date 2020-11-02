import { put, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { login as loginRequest, logout as logoutRequest } from 'api/requests/Auth'
import { removeItems, setItems } from '../utils/localStorage'
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../actions/constants'

export function* logout() {
  logoutRequest()
  removeItems(['authorization-token', 'user-id'])
  yield put(push('/'))
}

function* loginFlow({ creds }) {
  try {
    const { data, headers } = yield loginRequest(creds)
    const localData = [
      { key: 'authorization-token', value: headers.authorization },
      { key: 'user-id', value: data.id },
    ]
    yield setItems(localData)
    yield put({ type: LOGIN_SUCCESS, name: data.profileName })
    yield put(push('/card'))
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
