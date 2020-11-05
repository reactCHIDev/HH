import {
  GET_USER_ACCOUNT_REQUESTING,
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_REQUESTING,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_ERROR,
  RESET_CONFIRMATION,
} from '../actions/constants'

const isLogin = !!JSON.parse(localStorage.getItem('authorization-token'))

const initialState = {
  id: '',
  profileName: '',
  email: '',
  newEmail: null,
  role: '',
  reffering: null,
  languages: null,
  userPhoto: null,
  reward: 0,
  notifications: [],
  requesting: false,
  error: '',
  awaitingConfirmation: false,
}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ACCOUNT_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_USER_ACCOUNT_SUCCESS:
      return {
        ...state,
        ...action.data,
        requesting: false,
        error: '',
      }
    case GET_USER_ACCOUNT_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case UPDATE_ACCOUNT_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case UPDATE_ACCOUNT_SUCCESS:
      const { data } = action
      return {
        ...state,
        ...data,
        requesting: false,
        awaitingConfirmation: true,
      }

    case RESET_CONFIRMATION:
      return {
        ...state,
        awaitingConfirmation: false,
      }
    case UPDATE_ACCOUNT_ERROR:
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
