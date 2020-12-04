import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_ERROR_RESET,
  LINK_ERROR_SET,
  LOGOUT,
  REFRESH_TOKEN_SUCCESS,
  PASSWORD_CREATING,
  PASSWORD_REQUESTING,
  PASSWORD_REQUESTING_SUCCESS,
  PASSWORD_REQUESTING_ERROR,
  PASSWORD_CREATING_SUCCESS,
  PASSWORD_CREATING_ERROR,
} from '../actions/constants'

const isLogin = !!JSON.parse(localStorage.getItem('authorization-token'))

const initialState = {
  profileName: '',
  id: '',
  requesting: false,
  authorized: isLogin,
  messages: [],
  error: '',
  isTokenValid: false,
}

const reducer = function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case PASSWORD_REQUESTING:
      return {
        ...state,
        requesting: true,
      }
    case PASSWORD_CREATING:
      return {
        ...state,
        requesting: true,
      }

    case LOGIN_SUCCESS:
      const { name, id, role } = action.payload
      return {
        ...state,
        profileName: name,
        id,
        role,
        requesting: false,
        feed: action.response,
        authorized: true,
      }

    case LOGIN_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case LOGIN_ERROR_RESET:
      return {
        ...state,
        error: '',
      }

    case LINK_ERROR_SET:
      const { error } = action
      return {
        ...state,
        error,
      }

    case LOGOUT:
      return {
        ...state,
        authorized: false,
      }

    case PASSWORD_REQUESTING_SUCCESS:
      return {
        ...state,
        requesting: false,
      }

    case PASSWORD_REQUESTING_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case PASSWORD_CREATING_SUCCESS:
      return {
        ...state,
        requesting: false,
      }

    case PASSWORD_CREATING_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        isTokenValid: true,
      }

    default:
      return state
  }
}

export default reducer
