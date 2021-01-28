import {
  CREATE_PRODUCT_REQUESTING,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_REQUESTING,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  GET_PRODUCT_INFO_REQUESTING,
  GET_PRODUCT_INFO_SUCCESS,
  GET_PRODUCT_INFO_ERROR,
  TOGGLE_PRODUCT_STATUS_REQUESTING,
  TOGGLE_PRODUCT_STATUS_SUCCESS,
  TOGGLE_PRODUCT_STATUS_ERROR,
  DUPLICATE_PRODUCT_REQUESTING,
  DUPLICATE_PRODUCT_SUCCESS,
  DUPLICATE_PRODUCT_ERROR,
} from '../actions/constants'

const initialState = {}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_INFO_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_PRODUCT_INFO_SUCCESS:
      return {
        ...state,
        info: action.data,
        requesting: false,
        error: '',
      }
    case GET_PRODUCT_INFO_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case CREATE_PRODUCT_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        requesting: false,
        error: '',
      }
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case UPDATE_PRODUCT_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        requesting: false,
        error: '',
      }
    case UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case DUPLICATE_PRODUCT_SUCCESS:
      return {
        ...state,
        requesting: false,
        error: '',
        success: true,
      }
    case 'RESET_DUPLICATE_SUCCESS':
      return {
        ...state,
        success: false,
      }

    default:
      return state
  }
}

export default reducer
