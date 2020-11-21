import { put, takeEvery } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import * as jwt from 'jsonwebtoken'
import PATHS from 'api/paths'

import { updateSettings, getUserAccount, confirmEmailUpdate } from 'api/requests/Account'
import { removeItems, setItems } from '../utils/localStorage'

import { getItem } from '../utils/localStorage'
import {
  GET_USER_ACCOUNT_REQUESTING,
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_REQUESTING,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_ERROR,
  EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_ERROR,
  EMAIL_CONFIRM,
} from '../actions/constants'

function* getUserAccountSaga() {
  console.log('%c   saggga   ', 'color: white; background: salmon;')
  const userId = getItem('user-id')
  try {
    const response = yield getUserAccount(userId)
    yield put({ type: GET_USER_ACCOUNT_SUCCESS, data: response.data })
    // yield put(replace('/login'))
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_USER_ACCOUNT_ERROR, error: error.response.data.error })
    }
  }
}

function* updateUserAccount({ payload }) {
  const submittedData = { ...payload }
  const { newEmail } = submittedData
  if (newEmail) {
    const token = jwt.sign({ newEmail }, process.env.REACT_APP_JWT_SECRET_KEY, { expiresIn: 600 })
    const { url } = PATHS
    submittedData.updateEmailLink = `${url}/settings/change_email${token}`
  }
  try {
    const response = yield updateSettings(submittedData)
    yield put({ type: UPDATE_ACCOUNT_SUCCESS, payload: { data: response.data, newEmail } })
  } catch (error) {
    if (error.response) {
      yield put({ type: UPDATE_ACCOUNT_ERROR, error: error.response.data.error })
    }
  }
}

function* changeEmailConfirm({ payload }) {
  try {
    const response = yield confirmEmailUpdate(payload)
    yield put({ type: EMAIL_CONFIRM_SUCCESS, data: response.data })
    replace('/settings/account')
  } catch (error) {
    if (error.response) {
      yield put({ type: EMAIL_CONFIRM_ERROR, error: error.response.data.error })
    }
  }
}

function* accountWatcher() {
  yield takeEvery(GET_USER_ACCOUNT_REQUESTING, getUserAccountSaga)
  yield takeEvery(UPDATE_ACCOUNT_REQUESTING, updateUserAccount)
  yield takeEvery(EMAIL_CONFIRM, changeEmailConfirm)
}

export default accountWatcher
