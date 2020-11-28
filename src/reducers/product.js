import {
  GET_PRODUCT_INFO_REQUESTING,
  GET_PRODUCT_INFO_SUCCESS,
  GET_PRODUCT_INFO_ERROR,
  TOGGLE_PRODUCT_STATUS_REQUESTING,
  TOGGLE_PRODUCT_STATUS_SUCCESS,
  TOGGLE_PRODUCT_STATUS_ERROR,
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

    default:
      return state
  }
}

export default reducer
