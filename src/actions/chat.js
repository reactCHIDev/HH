import { SET_DIALOG_REQUESTING, SET_DIALOGS_REQUESTING } from './constants'

export const setDialogAC = (payload) => ({
  type: SET_DIALOG_REQUESTING,
  payload,
})

export const setDialogsAC = (payload) => ({
  type: SET_DIALOGS_REQUESTING,
  payload,
})
