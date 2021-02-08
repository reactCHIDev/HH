import {
  GET_PUBLIC_PRODUCTS,
  GET_PUBLIC_PRODUCTS_SUCCESS,
  GET_PUBLIC_PRODUCTS_ERROR,
  GET_PUBLIC_FOODMAKERS,
  GET_PUBLIC_FOODMAKERS_SUCCESS,
  GET_PUBLIC_FOODMAKERS_ERROR,
  GET_USER_BY_LINK_REQUESTING,
  GET_USER_BY_LINK_SUCCESS,
  GET_USER_BY_LINK_ERROR,
} from '../actions/constants'

const initialState = {
  products: [],
  foodmakers: [],
  foodmakerData: null,
  shopData: null,
  requesting: false,
}

const reducer = function loginReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PUBLIC_PRODUCTS:
      return {
        ...state,
        requesting: true,
        error: '',
      }

    case GET_PUBLIC_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.data,
        requesting: false,
      }

    case GET_PUBLIC_PRODUCTS_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_PUBLIC_FOODMAKERS:
      return {
        ...state,
        requesting: true,
        error: '',
      }

    case GET_PUBLIC_FOODMAKERS_SUCCESS:
      return {
        ...state,
        foodmakers: action.data,
        requesting: false,
      }

    case GET_PUBLIC_FOODMAKERS_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case GET_USER_BY_LINK_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }

    case GET_USER_BY_LINK_SUCCESS:
      return {
        ...state,
        foodmaker: action.data,
        requesting: false,
        error: '',
      }

    case GET_USER_BY_LINK_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case 'FOODMAKER_PAGE_DATA':
      return {
        ...state,
        ...action.data,
        requesting: false,
        error: action.error,
      }

    default:
      return state
  }
}

export default reducer
