import {
  UPDATE_SHOP_REQUESTING,
  UPDATE_SHOP_SUCCESS,
  UPDATE_SHOP_ERROR,
  GET_SHOP_BY_FM_ID_REQUESTING,
  GET_SHOP_BY_FM_ID_SUCCESS,
  GET_SHOP_BY_FM_ID_ERROR,
  GET_SHOP_BY_URL_REQUESTING,
  GET_SHOP_BY_URL_SUCCESS,
  GET_SHOP_BY_URL_ERROR,
} from '../actions/constants'

const initialState = {
  shopData: {},
  requesting: false,
  success: false,
  error: '',
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
        success: true,
        requesting: false,
        error: '',
      }

    case 'RESET_SHOP_SUCCESS':
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

    case GET_SHOP_BY_FM_ID_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_SHOP_BY_FM_ID_SUCCESS:
      return {
        ...state,
        shopData: action.payload.data,
        requesting: false,
        error: '',
      }

    case GET_SHOP_BY_FM_ID_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case GET_SHOP_BY_URL_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_SHOP_BY_URL_SUCCESS:
      return {
        ...state,
        shopData: action.payload.data,
        requesting: false,
        error: '',
      }

    case GET_SHOP_BY_URL_ERROR:
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
