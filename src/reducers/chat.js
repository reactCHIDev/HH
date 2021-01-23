import {
  SET_DIALOG,
  SET_DIALOGS,
  ADD_NEW_DIALOG,
  SET_ACTIVE_CHAT,
  SET_SOCKET,
} from 'actions/constants'

const initialState = {
  dialog: [],
  dialogs: [],
  newMessages: [],
  activeChat: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIALOG:
      return {
        ...state,
        dialog: action.payload,
      }

    case SET_DIALOGS:
      return {
        ...state,
        dialogs: action.payload,
      }

    case ADD_NEW_DIALOG:
      const newDialogs = state.dialogs.concat(action.payload)
      return {
        ...state,
        dialogs: newDialogs,
      }

    case SET_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.payload,
      }

    default:
      return state
  }
}

export default reducer
