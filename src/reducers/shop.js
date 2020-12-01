import {
  UPDATE_SHOP_REQUESTING,
  UPDATE_SHOP_SUCCESS,
  UPDATE_SHOP_ERROR,
} from '../actions/constants'

const initialState = {
  title: '',
  description: '',
  tags: [],
  coverPhoto: '',
  deliveryMethods: [],
  success: false,
}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SHOP_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case UPDATE_SHOP_SUCCESS:
      return {
        ...state,
        ...action.data,
        success: true,
        requesting: false,
        error: '',
      }

    case 'RESET_ACCOUNT_SUCCESS':
      return {
        ...state,
        success: false,
      }

    case UPDATE_SHOP_ERROR:
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
