import { put, takeEvery } from 'redux-saga/effects'
import { getUsersListReq, getShopsListReq, getWithdrawListReq } from 'api/requests/Admin'

import {
  GET_USERS_LIST_REQUESTING,
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_ERROR,
  GET_SHOPS_LIST_REQUESTING,
  GET_SHOPS_LIST_SUCCESS,
  GET_SHOPS_LIST_ERROR,
  GET_WITHDRAW_LIST_REQUESTING,
  GET_WITHDRAW_LIST_SUCCESS,
  GET_WITHDRAW_LIST_ERROR,
} from '../actions/constants'

function* getUsersListSaga() {
  try {
    const response = yield getUsersListReq()
    yield put({ type: GET_USERS_LIST_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_USERS_LIST_ERROR, error: error.response.data.error })
    }
  }
}

function* getShopsListSaga() {
  try {
    const response = yield getShopsListReq()
    yield put({ type: GET_SHOPS_LIST_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_SHOPS_LIST_ERROR, error: error.response.data.error })
    }
  }
}

function* getWithdrawListSaga() {
  try {
    const response = yield getWithdrawListReq({ startIndex: 0, limit: 100, status: null })
    yield put({ type: GET_WITHDRAW_LIST_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_WITHDRAW_LIST_ERROR, error: error.response.data.error })
    }
  }
}

function* adminWatcher() {
  yield takeEvery(GET_USERS_LIST_REQUESTING, getUsersListSaga)
  yield takeEvery(GET_SHOPS_LIST_REQUESTING, getShopsListSaga)
  yield takeEvery(GET_WITHDRAW_LIST_REQUESTING, getWithdrawListSaga)
}

export default adminWatcher
