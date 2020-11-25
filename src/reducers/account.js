import {
  GET_USER_ACCOUNT_REQUESTING,
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_REQUESTING,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_PHOTO_NAME_REQUESTING,
  UPDATE_PHOTO_NAME_SUCCESS,
  UPDATE_PHOTO_NAME_ERROR,
  UPDATE_FOODMAKER_ACCOUNT_REQUESTING,
  UPDATE_FOODMAKER_ACCOUNT_SUCCESS,
  UPDATE_FOODMAKER_ACCOUNT_ERROR,
  RESET_CONFIRMATION,
  GET_SPECIALITY_TAGS_REQUESTING,
  GET_SPECIALITY_TAGS_SUCCESS,
  GET_SPECIALITY_TAGS_ERROR,
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
  success: false,
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
      const { data, newEmail } = action.payload
      console.log('%c   newEmail   ', 'color: darkgreen; background: palegreen;', !!newEmail)
      console.log('%c   data   ', 'color: darkgreen; background: palegreen;', data)
      return {
        ...state,
        ...data,
        requesting: false,
        success: true,
        awaitingConfirmation: !!newEmail,
      }

    case UPDATE_PHOTO_NAME_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }

    case UPDATE_PHOTO_NAME_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      }

    case UPDATE_PHOTO_NAME_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case UPDATE_FOODMAKER_ACCOUNT_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }

    case UPDATE_FOODMAKER_ACCOUNT_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      }

    case UPDATE_FOODMAKER_ACCOUNT_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case 'RESET_SUCCESS':
      return {
        ...state,
        success: false,
      }

    case RESET_CONFIRMATION:
      return {
        ...state,
        awaitingConfirmation: false,
        error: null,
      }

    case UPDATE_ACCOUNT_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case GET_SPECIALITY_TAGS_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }

    case GET_SPECIALITY_TAGS_SUCCESS:
      return {
        ...state,
        ...action.data,
        requesting: false,
        error: '',
      }

    case GET_SPECIALITY_TAGS_ERROR:
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
