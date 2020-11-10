import {
  GET_PRODUCT_TYPES_REQUESTING,
  GET_PRODUCT_TYPES_SUCCESS,
  GET_PRODUCT_TYPES_ERROR,
  GET_MY_PRODUCT_LIST_REQUESTING,
  GET_MY_PRODUCT_LIST_SUCCESS,
  GET_MY_PRODUCT_LIST_ERROR,
} from '../actions/constants'

const initialState = {
  types: [],
  myProducts: [],
  requesting: false,
  error: '',
}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_TYPES_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_PRODUCT_TYPES_SUCCESS:
      return {
        ...state,
        types: action.data,
        requesting: false,
        error: '',
      }
    case GET_PRODUCT_TYPES_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_MY_PRODUCT_LIST_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_MY_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        myProducts: action.data,
        requesting: false,
        error: '',
      }
    case GET_MY_PRODUCT_LIST_ERROR:
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
