import {
  SET_DIALOG,
  SET_DIALOGS,
  ADD_NEW_DIALOG,
  SET_ACTIVE_CHAT,
  SET_PAGE,
} from 'actions/constants'

const initialState = {
  dialog: [],
  dialogs: [],
  activeChat: null,
  page: 0,
  scroll: 0,
  newMessages: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIALOG:
      return {
        ...state,
        dialog: action.payload,
        scroll: action.scroll,
        newMsg: false,
        page: state.newMsg ? 0 : state.page,
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
        dialog: [],
        activeChat: action.payload,
        page: 0,
      }

    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      }

    case 'SET_NEW_MESSAGES':
      return {
        ...state,
        newMessages: action.payload,
      }

    case 'NEW_MSG':
      return {
        ...state,
        newMsg: true,
      }

    default:
      return state
  }
}

export default reducer
