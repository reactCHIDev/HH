import { put, takeEvery } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import * as jwt from 'jsonwebtoken'
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
  const token = jwt.sign({ email: 'postbox32@gmail.com' }, 'secret', { expiresIn: 60 })
  const url =
    process.env.NODE_ENV !== 'development' && process.env.REACT_APP_STAGE !== 'development'
      ? 'https://hungryhugger.wildwebart.com'
      : 'localhost:3000'
  const data = { email, secretLink: `${url}/login/forgotstep3${token}` }
  try {
    const response = yield forgotStep1(data)
    yield put({ type: PASSWORD_REQUESTING_SUCCESS, data: response.data })
    yield put(push('/login/forgotstep2'))
  } catch (error) {
    yield put({ type: PASSWORD_REQUESTING_ERROR, error })
  }
}

function* forgotStepThree({ payload }) {
  try {
    const response = yield forgotStep3({ ...payload })
    yield put({ type: PASSWORD_CREATING_SUCCESS, data: response.data })
    removeItems(['authorization-token', 'user-id'])
    yield put(push('/login/forgotstep4'))
  } catch (error) {
    yield put({ type: PASSWORD_CREATING_ERROR, error })
  }
}

function* loginWatcher() {
  yield takeEvery(PASSWORD_REQUESTING, forgotStepOne)
  yield takeEvery(PASSWORD_CREATING, forgotStepThree)
}

export default loginWatcher
