import { put, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { forgotStep1, forgotStep2 } from 'api/requests/Auth'
import {
  PASSWORD_REQUESTING,
  PASSWORD_REQUESTING_SUCCESS,
  PASSWORD_REQUESTING_ERROR,
} from '../actions/constants'

function* forgotStepOne({ email }) {
  const data = { email, secretLink: 'localhost:3000/forgotpassword/:1625qwe' }
  try {
    const response = yield forgotStep1(data)
    yield put({ type: PASSWORD_REQUESTING_SUCCESS, data: response.data })
  } catch (error) {
    yield put({ type: PASSWORD_REQUESTING_ERROR, error })
  }
}

function* forgotStepTwo({ password }) {
  /*   const data = { email, secretLink: 'localhost:3000/forgotpassword/:1625qwe' }
  try {
    const response = yield forgotStep1(data)
    yield put({ type: PASSWORD_REQUESTING_SUCCESS, data: response.data })
  } catch (error) {
    yield put({ type: PASSWORD_REQUESTING_ERROR, error })
  } */
}

function* loginWatcher() {
  yield takeEvery(PASSWORD_REQUESTING, forgotStepOne)
  yield takeEvery(PASSWORD_REQUESTING_SUCCESS, forgotStepTwo)
}

export default loginWatcher
