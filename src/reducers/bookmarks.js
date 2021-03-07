import {
  GET_FAV_PRODUCTS,
  GET_FAV_PRODUCTS_SUCCESS,
  GET_FAV_PRODUCTS_ERROR,
  GET_FAV_EXPERIENCES,
  GET_FAV_EXPERIENCES_SUCCESS,
  GET_FAV_EXPERIENCES_ERROR,
  GET_FAV_FOODMAKERS,
  GET_FAV_FOODMAKERS_SUCCESS,
  GET_FAV_FOODMAKERS_ERROR,
  GET_FAV_SHOPS,
  GET_FAV_SHOPS_SUCCESS,
  GET_FAV_SHOPS_ERROR,
} from '../actions/constants'

const initialState = {
  favExperiences: [],
  favProducts: [],
  favFoodmakers: [],
  favShops: [],
  requesting: false,
}

const reducer = function bookmarksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAV_PRODUCTS:
      return {
        ...state,
        requesting: true,
        error: '',
      }

    case GET_FAV_PRODUCTS_SUCCESS:
      return {
        ...state,
        favProducts: action.data,
        requesting: false,
      }

    case GET_FAV_PRODUCTS_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_FAV_EXPERIENCES:
      return {
        ...state,
        requesting: true,
        error: '',
      }

    case GET_FAV_EXPERIENCES_SUCCESS:
      return {
        ...state,
        favExperiences: action.data,
        requesting: false,
      }

    case GET_FAV_EXPERIENCES_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_FAV_FOODMAKERS:
      return {
        ...state,
        requesting: true,
        error: '',
      }

    case GET_FAV_FOODMAKERS_SUCCESS:
      return {
        ...state,
        favFoodmakers: action.data,
        requesting: false,
      }

    case GET_FAV_FOODMAKERS_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_FAV_SHOPS:
      return {
        ...state,
        requesting: true,
        error: '',
      }

    case GET_FAV_SHOPS_SUCCESS:
      return {
        ...state,
        favShops: action.data,
        requesting: false,
      }

    case GET_FAV_SHOPS_ERROR:
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
