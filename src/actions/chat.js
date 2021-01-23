import {
  DISPATCH_MSG,
  SET_DIALOG,
  SET_DIALOGS,
  NEW_DIALOG,
  SET_ACTIVE_CHAT,
  SET_SOCKET,
} from './constants'

export const dispatchMsg = (socket, payload) => ({
  type: DISPATCH_MSG,
  socket,
  payload,
})

export const setDialogAC = (payload) => ({
  type: SET_DIALOG,
  payload,
})

export const setDialogsAC = (payload) => ({
  type: SET_DIALOGS,
  payload,
})

export const setNewDialogAC = (payload) => ({
  type: NEW_DIALOG,
  payload,
})

export const setActiveChatAC = (payload) => ({
  type: SET_ACTIVE_CHAT,
  payload,
})

export const setSocketAC = (payload) => ({
  type: SET_SOCKET,
  payload,
})
