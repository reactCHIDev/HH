import { takeEvery, put } from 'redux-saga/effects'

import { SET_DIALOG_REQUESTING, SET_DIALOG_SUCCESS, SET_DIALOG_ERROR } from '../actions/constants'

function* setDialogSaga({ payload }) {}

function* chatWatcher() {
  yield takeEvery('SET', setDialogSaga)
}

export default chatWatcher
