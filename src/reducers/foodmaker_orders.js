import {
  GET_FOODMAKER_ORDERS_REQUESTING,
  GET_FOODMAKER_ORDERS_SUCCESS,
  GET_FOODMAKER_ORDERS_ERROR,
  GET_FM_ORDER_REQUESTING,
  GET_FM_ORDER_SUCCESS,
  GET_FM_ORDER_ERROR,
  REMOVE_FM_ORDER,
} from '../actions/constants'

const initialState = {
  requesting: false,
  eroror: '',
  orders: [],
  order: {},
}

const reducer = function foodmakerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOODMAKER_ORDERS_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_FOODMAKER_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.data,
        requesting: false,
      }
    case GET_FOODMAKER_ORDERS_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_FM_ORDER_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_FM_ORDER_SUCCESS:
      return {
        ...state,
        order: action.data,
        requesting: false,
      }
    case GET_FM_ORDER_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case REMOVE_FM_ORDER:
      return {
        ...state,
        order: {},
      }

    default:
      return state
  }
}

export default reducer
