import { ACTION_TEST } from 'actions/constants'
import {
  SIGNUP_FOODMAKER_REQUESTING,
  SIGNUP_FOODMAKER_SUCCESS,
  SIGNUP_FOODMAKER_ERROR,
} from 'actions/signup'

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

    case 'SIGNUP_FOODMAKER_REQUESTING':
      return {
        ...state,
        requesting: true,
        success: false,
        error: false,
      }

    case 'SIGNUP_FOODMAKER_SUCCESS':
      return {
        ...state,
        requesting: false,
        success: true,
      }

    case 'SIGNUP_FOODMAKER_ERROR':
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
