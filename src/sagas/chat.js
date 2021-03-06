import { takeEvery, put, select } from 'redux-saga/effects'
import { getDialog, getNewMessages } from 'utils/openWS'
import { getItem } from 'utils/localStorage'

import { DISPATCH_MSG, SET_DIALOG, SET_DIALOGS } from '../actions/constants'

const id = getItem('user-id')

function* msgHandlerSaga({ socket, payload }) {
  const msg = JSON.parse(payload)

  if (msg.event === 'getDialog') {
    const {
      chat: { dialog, newMsg },
    } = yield select()
    const messages = newMsg ? msg.messages : dialog.concat(msg.messages)
    const scroll = msg.messages.length
    yield put({ type: SET_DIALOG, payload: messages, scroll })
  }

  if (
    msg.event === 'sendMessage' &&
    (msg.message.recipientId === id || msg.message.senderId === id)
  ) {
    const {
      chat: { activeChat },
    } = yield select()
    const dialogWithId =
      msg.message.recipientId === id ? msg.message.senderId : msg.message.recipientId
    if (dialogWithId === activeChat) {
      yield put({ type: 'NEW_MSG', incoming: msg.message.recipientId === id ? 1 : 2 })
      getDialog(socket, dialogWithId)
    } else {
      getNewMessages(socket)
    }
  }

  if (msg.event === 'getDialogs') yield put({ type: SET_DIALOGS, payload: msg.dialogs })

  if (msg.event === 'getNewMessages') yield put({ type: 'SET_NEW_MESSAGES', payload: msg.messages })

  if (msg.event === 'setAsReviewed' && msg.affected > 0) getNewMessages(socket)
}

function* chatWatcher() {
  yield takeEvery(DISPATCH_MSG, msgHandlerSaga)
}

export default chatWatcher
