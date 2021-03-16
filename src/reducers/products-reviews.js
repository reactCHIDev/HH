import {
  GET_REVIEWS_FOR_PRODUCTS_REQUESTING,
  GET_REVIEWS_FOR_PRODUCTS_SUCCESS,
  GET_REVIEWS_FOR_PRODUCTS_ERROR,
} from '../actions/constants'

const initialState = {
  requesting: false,
  eroror: '',
  reviews: [],
  currentProductPage: 1,
}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS_FOR_PRODUCTS_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: false,
      }
    case GET_REVIEWS_FOR_PRODUCTS_SUCCESS:
      return {
        ...state,
        ...action.data,
        requesting: false,
        error: false,
      }

    case GET_REVIEWS_FOR_PRODUCTS_ERROR:
      return {
        ...state,
        requesting: false,
        error: true,
      }

    default:
      return state
  }
}

export default reducer
