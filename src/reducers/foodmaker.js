import {
  GET_FOODMAKER_INFO_REQUESTING,
  GET_FOODMAKER_INFO_SUCCESS,
  GET_FOODMAKER_INFO_ERROR,
  GET_FOODMAKER_INFO_BY_NAME_REQUESTING,
  GET_FOODMAKER_INFO_BY_NAME_SUCCESS,
  GET_FOODMAKER_INFO_BY_NAME_ERROR,
  UPDATE_BANK_DATA_SUCCESS,
  UPDATE_BANK_DATA_ERROR,
} from '../actions/constants'

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
  isPaymentDataValid: false,
}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOODMAKER_INFO_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_FOODMAKER_INFO_SUCCESS:
      return {
        ...state,
        ...action.data,
        requesting: false,
        error: '',
      }
    case GET_FOODMAKER_INFO_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_FOODMAKER_INFO_BY_NAME_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_FOODMAKER_INFO_BY_NAME_SUCCESS:
      return {
        ...state,
        ...action.data,
        requesting: false,
        error: '',
      }
    case GET_FOODMAKER_INFO_BY_NAME_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case UPDATE_BANK_DATA_SUCCESS:
      return {
        ...state,
        isPaymentDataValid: true,
      }

    case UPDATE_BANK_DATA_ERROR:
      return {
        ...state,
        isPaymentDataValid: false,
      }

    default:
      return state
  }
}

export default reducer
