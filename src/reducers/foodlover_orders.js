import {
  GET_FOODLOVER_ORDERS_REQUESTING,
  GET_FOODLOVER_ORDERS_SUCCESS,
  GET_FOODLOVER_ORDERS_ERROR,
  GET_FL_ORDER_REQUESTING,
  GET_FL_ORDER_SUCCESS,
  GET_FL_ORDER_ERROR,
  REMOVE_FL_ORDER,
} from '../actions/constants'

const initialState = {
  requesting: false,
  eroror: '',
  orders: [],
  order: {},
}

const reducer = function foodloverReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOODLOVER_ORDERS_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_FOODLOVER_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.data,
        requesting: false,
      }
    case GET_FOODLOVER_ORDERS_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_FL_ORDER_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_FL_ORDER_SUCCESS:
      return {
        ...state,
        order: action.data,
        requesting: false,
      }
    case GET_FL_ORDER_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case REMOVE_FL_ORDER:
      return {
        ...state,
        order: {},
      }

    default:
      return state
  }
}

export default reducer
