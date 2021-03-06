import {
  GET_USERS_LIST_REQUESTING,
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_ERROR,
  GET_SHOPS_LIST_REQUESTING,
  GET_SHOPS_LIST_SUCCESS,
  GET_SHOPS_LIST_ERROR,
  GET_WITHDRAW_LIST_REQUESTING,
  GET_WITHDRAW_LIST_SUCCESS,
  GET_WITHDRAW_LIST_ERROR,
  GET_FAQ_LIST_REQUESTING,
  GET_FAQ_LIST_SUCCESS,
  GET_FAQ_LIST_ERROR,
} from '../actions/constants'

const initialState = {
  usersList: [],
  shopsList: [],
  withdrawList: [],
  faq: [],
  params: {},
  requesting: false,
  error: '',
}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_LIST_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        usersList: action.data,
        requesting: false,
        error: '',
      }
    case GET_USERS_LIST_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_FAQ_LIST_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_FAQ_LIST_SUCCESS:
      return {
        ...state,
        faq: action.data,
        requesting: false,
        error: '',
      }
    case GET_FAQ_LIST_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_SHOPS_LIST_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_SHOPS_LIST_SUCCESS:
      return {
        ...state,
        shopsList: action.data,
        requesting: false,
        error: '',
      }
    case GET_SHOPS_LIST_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_WITHDRAW_LIST_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_WITHDRAW_LIST_SUCCESS:
      return {
        ...state,
        withdrawList: action.data,
        params: action.params,
        requesting: false,
        error: '',
      }
    case GET_WITHDRAW_LIST_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    default:
      return state
  }
}

export default reducer
