import { put, takeEvery } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import * as jwt from 'jsonwebtoken'
import PATHS from 'api/paths'

import { forgotStep1, forgotStep3 } from 'api/requests/Auth'
import { removeItems } from '../utils/localStorage'
import {
  PASSWORD_REQUESTING,
  PASSWORD_REQUESTING_SUCCESS,
  PASSWORD_REQUESTING_ERROR,
  PASSWORD_CREATING,
  PASSWORD_CREATING_SUCCESS,
  PASSWORD_CREATING_ERROR,
} from '../actions/constants'

function* forgotStepOne({ email }) {
  const token = jwt.sign({ email }, process.env.REACT_APP_JWT_SECRET_KEY, { expiresIn: 3600 })
  const { url } = PATHS
  const data = { email, secretLink: `${url}/login/forgotstep3${token}` }
  try {
    const response = yield forgotStep1(data)
    yield put({ type: PASSWORD_REQUESTING_SUCCESS, data: response.data })
    yield put(replace('/login/forgotstep2'))
  } catch (error) {
    if (error.response) {
      yield put({ type: PASSWORD_REQUESTING_ERROR, error: error.response.data.error })
    }
  }
}

function* forgotStepThree({ payload }) {
  try {
    const response = yield forgotStep3({ ...payload })
    yield put({ type: PASSWORD_CREATING_SUCCESS, data: response.data })
    removeItems(['authorization-token', 'user-id'])
    yield put(replace('/login/forgotstep4'))
  } catch (error) {
    if (error.response) {
      yield put({ type: PASSWORD_CREATING_ERROR, error: error.response.data.error })
    }
  }
}

function* loginWatcher() {
  yield takeEvery(PASSWORD_REQUESTING, forgotStepOne)
  yield takeEvery(PASSWORD_CREATING, forgotStepThree)
}

export default loginWatcher
