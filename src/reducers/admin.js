import {
  GET_USERS_LIST_REQUESTING,
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_ERROR,
  GET_SHOPS_LIST_REQUESTING,
  GET_SHOPS_LIST_SUCCESS,
  GET_SHOPS_LIST_ERROR,
} from '../actions/constants'

const initialState = {
  usersList: [],
  shopsList: [],
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

    default:
      return state
  }
}

export default reducer
