import {
  CREATE_ORDER_REQUESTING,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
} from 'actions/constants'

const initialState = {
  ordersList: [],
  requesting: false,
  success: false,
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUESTING:
      return {
        ...state,
        requesting: true,
        success: false,
        error: false,
      }
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        requesting: false,
        error: false,
      }

    case CREATE_ORDER_ERROR:
      return {
        ...state,
        requesting: false,
        error: true,
      }
    case 'RESET_CREATE_ORDER_ERROR':
      return {
        ...state,
        error: false,
      }

    default:
      return state
  }
}

export default reducer
