import { put, takeEvery } from 'redux-saga/effects'
import { getUsersListReq } from 'api/requests/Admin'

import {
  GET_USERS_LIST_REQUESTING,
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_ERROR,
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

function* adminWatcher() {
  yield takeEvery(GET_USERS_LIST_REQUESTING, getUsersListSaga)
}

export default adminWatcher
