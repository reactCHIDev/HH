import {
  GET_PUBLIC_PRODUCTS,
  GET_PUBLIC_PRODUCTS_SUCCESS,
  GET_PUBLIC_PRODUCTS_ERROR,
  GET_PUBLIC_FOODMAKERS,
  GET_PUBLIC_FOODMAKERS_SUCCESS,
  GET_PUBLIC_FOODMAKERS_ERROR,
} from '../actions/constants'

const initialState = {
  products: [],
  foodmakers: [],
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
      }

    case GET_PUBLIC_FOODMAKERS_ERROR:
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
