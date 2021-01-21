import { SET_DIALOG_REQUESTING, SET_DIALOGS_REQUESTING } from 'actions/constants'

const initialState = {
  dialog: [],
  dialogs: [],
  newMessages: [],
  requesting: false,
  success: false,
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIALOG_REQUESTING:
      return {
        ...state,
        dialog: JSON.parse(action.payload),
        requesting: true,
        success: false,
        error: false,
      }

    case SET_DIALOGS_REQUESTING:
      return {
        ...state,
        dialogs: JSON.parse(action.payload),
        requesting: true,
        success: false,
        error: false,
      }

    default:
      return state
  }
}

export default reducer
