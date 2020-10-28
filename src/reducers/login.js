import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  REFRESH_TOKEN_SUCCESS,
  PASSWORD_REQUESTING_SUCCESS,
  PASSWORD_REQUESTING_ERROR,
  PASSWORD_CREATING_SUCCESS,
} from '../actions/constants'

const isLogin = !!JSON.parse(localStorage.getItem('authorization-token'))

const initialState = {
  requesting: false,
  authorized: isLogin,
  messages: [],
  errors: [],
  isTokenValid: false,
  forgotProcess: {
    step1: '',
    step2: '',
    step3: '',
    step4: '',
  },
}

const reducer = function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUESTING:
      return {
        ...state,
        requesting: true,
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        requesting: false,
        feed: action.response,
        authorized: true,
      }

    case LOGIN_ERROR:
      return {
        ...state,
        errors: state.errors.concat([
          {
            body: action.error.toString(),
            time: new Date(),
          },
        ]),
        requesting: false,
      }

    case LOGOUT:
      return {
        ...state,
        authorized: false,
      }

    case PASSWORD_REQUESTING_SUCCESS:
      return {
        ...state,
        forgotProcess: {
          step1: 'success',
          step2: '',
          step3: '',
          step4: '',
        },
      }
    case PASSWORD_REQUESTING_ERROR:
      return {
        ...state,
        forgotProcess: {
          step1: 'error',
          step2: '',
          step3: '',
          step4: '',
        },
      }

    case PASSWORD_CREATING_SUCCESS:
      return {
        ...state,
        forgotProcess: {
          step1: 'success',
          step2: '',
          step3: 'success',
          step4: '',
        },
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
