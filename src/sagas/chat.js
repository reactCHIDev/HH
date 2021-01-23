import { takeEvery, put } from 'redux-saga/effects'
import { getDialog } from 'utils/openWS'

import {
  DISPATCH_MSG,
  SET_DIALOG,
  SET_DIALOGS,
  NEW_DIALOG,
  ADD_NEW_DIALOG,
} from '../actions/constants'

import { getItem } from 'utils/localStorage'

const id = getItem('user-id')

function* msgHandlerSaga({ socket, payload }) {
  console.log('%c   msg   ', 'color: white; background: royalblue;', payload)
  const msg = JSON.parse(payload)
  if (msg.event === 'getDialog') yield put({ type: SET_DIALOG, payload: msg.messages })
  if (msg.event === 'getDialogs') yield put({ type: SET_DIALOGS, payload: msg.dialogs })
  if (
    msg.event === 'sendMessage' &&
    (msg.message.recipientId === id || msg.message.senderId === id)
  ) {
    const dialogWithId =
      msg.message.recipientId === id ? msg.message.senderId : msg.message.recipientId
    console.log('%c   newMsg  ', 'color: darkgreen; background: palegreen;', msg.message)
    getDialog(socket, dialogWithId)
  }
}

function* newDialogSaga({ payload }) {
  const dialog = {
    recipient: { id: payload.id, url: payload.userPhoto, name: payload.profileName },
  }
  yield put({ type: ADD_NEW_DIALOG, payload: dialog })
}

function* chatWatcher() {
  yield takeEvery(DISPATCH_MSG, msgHandlerSaga)
  yield takeEvery(NEW_DIALOG, newDialogSaga)
}

export default chatWatcher
