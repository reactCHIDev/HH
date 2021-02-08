import cloneDeep from 'lodash/cloneDeep'

import {
  SET_DIALOG,
  SET_DIALOGS,
  ADD_NEW_DIALOG,
  SET_ACTIVE_CHAT,
  SET_PAGE,
  SET_CHAT_HEIGHT,
  SET_NEW_CONTACT,
  CLEAR_CHAT,
} from 'actions/constants'

const initialState = {
  dialog: [],
  dialogs: [],
  activeChat: null,
  page: 0,
  scroll: 0,
  newMessages: null,
  recipient: null,
  height: 0,
  newContact: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIALOG:
      return {
        ...state,
        dialog: action.payload,
        scroll: action.scroll,
        newMsg: false,
        height: state.newMsg ? 0 : state.height,
        page: state.newMsg ? 0 : state.page,
      }

    case SET_DIALOGS:
      const dialogs = cloneDeep(action.payload)
      const newChat = state.newContact
      const chatList =
        newChat && !dialogs.find((e) => e?.recipient?.id === newChat?.id)
          ? [newChat].concat(dialogs)
          : dialogs
      return {
        ...state,
        dialogs: chatList,
        newContact: null,
        dialog: newChat ? [] : state.dialog,
        activeChat: newChat ? newChat.id : state.activeChat,
        recipient: newChat ? newChat.recipient : state.recipient,
        page: newChat ? 0 : state.page,
        scroll: newChat ? 0 : state.scroll,
      }

    case ADD_NEW_DIALOG:
      const newDialogs = cloneDeep(state.dialogs).concat(action.payload)
      return {
        ...state,
        dialogs: newDialogs,
      }

    case SET_ACTIVE_CHAT:
      return {
        ...state,
        dialog: [],
        activeChat: action.id,
        recipient: action.recipient,
        page: 0,
        scroll: 0,
      }

    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      }

    case SET_CHAT_HEIGHT:
      return {
        ...state,
        height: action.payload,
      }

    case SET_NEW_CONTACT:
      return {
        ...state,
        newContact: action.payload,
      }

    case 'SET_NEW_MESSAGES':
      return {
        ...state,
        newMessages: action.payload,
      }

    case 'NEW_MSG':
      return {
        ...state,
        newMsg: action.incoming,
      }

    case CLEAR_CHAT:
      return {
        ...initialState,
        newMessages: state.newMessages,
      }

    default:
      return state
  }
}

export default reducer
