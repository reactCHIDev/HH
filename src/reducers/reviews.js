import {
  GET_UNREVIEWED_PRODUCT_REQUESTING,
  GET_UNREVIEWED_PRODUCT_SUCCESS,
  GET_UNREVIEWED_PRODUCT_ERROR,
} from 'actions/constants'

const initialState = {
  unreviewedProduct: null,
  requesting: false,
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_UNREVIEWED_PRODUCT_REQUESTING:
      return {
        ...state,
        requesting: true,
        success: false,
        error: false,
      }
    case GET_UNREVIEWED_PRODUCT_SUCCESS:
      return {
        ...state,
        unreviewedProduct: action.data,
        requesting: false,
        error: false,
      }

    case GET_UNREVIEWED_PRODUCT_ERROR:
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
