import {
  SIGNUP_FOODMAKER_REQUESTING,
  SIGNUP_FOODMAKER_SUCCESS,
  SIGNUP_FOODMAKER_ERROR,
  SIGNUP_LOVER_AS_MAKER_REQUESTING,
  SIGNUP_LOVER_AS_MAKER_SUCCESS,
  SIGNUP_LOVER_AS_MAKER_ERROR,
} from 'actions/constants'

const initialState = {
  requesting: false,
  success: false,
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_REQUESTING':
      return {
        ...state,
        requesting: true,
        success: false,
        error: false,
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        requesting: false,
      }

    case 'SIGNUP_ERROR':
      return {
        ...state,
        requesting: false,
        error: true,
      }

    case SIGNUP_FOODMAKER_REQUESTING:
      return {
        ...state,
        requesting: true,
        success: false,
        error: false,
      }

    case SIGNUP_FOODMAKER_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      }

    case SIGNUP_FOODMAKER_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error.error,
      }

    case SIGNUP_LOVER_AS_MAKER_REQUESTING:
      return {
        ...state,
        requesting: true,
        success: false,
        error: false,
      }

    case SIGNUP_LOVER_AS_MAKER_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      }

    case SIGNUP_LOVER_AS_MAKER_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error.error,
      }

    default:
      return state
  }
}

export default reducer
