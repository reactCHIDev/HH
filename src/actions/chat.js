import {
  DISPATCH_MSG,
  SET_DIALOG,
  SET_DIALOGS,
  NEW_DIALOG,
  SET_ACTIVE_CHAT,
  SET_PAGE,
  SET_CHAT_HEIGHT,
  SET_NEW_CONTACT,
  CLEAR_CHAT,
} from './constants'

export const dispatchMsg = (socket, payload) => ({
  type: DISPATCH_MSG,
  socket,
  payload,
})

export const setDialogAC = (payload, scroll) => ({
  type: SET_DIALOG,
  payload,
  scroll,
})

export const setDialogsAC = (payload) => ({
  type: SET_DIALOGS,
  payload,
})

export const setNewDialogAC = (payload) => ({
  type: NEW_DIALOG,
  payload,
})

export const setActiveChatAC = (id, recipient) => ({
  type: SET_ACTIVE_CHAT,
  id,
  recipient,
})

export const setPageAC = (payload) => ({
  type: SET_PAGE,
  payload,
})

export const setChatHeightAC = (payload) => ({
  type: SET_CHAT_HEIGHT,
  payload,
})

export const setNewContactAC = (payload) => ({
  type: SET_NEW_CONTACT,
  payload,
})

export const clearChat = (payload) => ({
  type: CLEAR_CHAT,
  payload,
})
