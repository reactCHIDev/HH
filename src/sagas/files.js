import { put, takeEvery } from 'redux-saga/effects'

import { deleteFileReq } from 'api/requests/Files'

import { DELETE_FILE_REQUEST, DELETE_FILE_SUCCESS, DELETE_FILE_ERROR } from '../actions/constants'

function* deleteFileSaga({ payload }) {
  try {
    const response = yield deleteFileReq(payload)
    yield put({ type: DELETE_FILE_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: DELETE_FILE_ERROR, error: error.response.data.error })
    }
  }
}

function* listingWatcher() {
  yield takeEvery(DELETE_FILE_REQUEST, deleteFileSaga)
}

export default listingWatcher
