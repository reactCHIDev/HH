import {
  GET_UNREVIEWED_PRODUCT_REQUESTING,
  GET_UNREVIEWED_PRODUCT_SUCCESS,
  GET_UNREVIEWED_PRODUCT_ERROR,
  CREATE_PRODUCT_REVIEW_REQUESTING,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_ERROR,
} from 'actions/constants'

const initialState = {
  unreviewedProduct: null,
  requesting: false,
  error: false,
  createReviewRequesting: false,
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
    case CREATE_PRODUCT_REVIEW_REQUESTING:
      return {
        ...state,
        createReviewRequesting: true,
      }
    case CREATE_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        createReviewRequesting: false,
      }

    case CREATE_PRODUCT_REVIEW_ERROR:
      return {
        ...state,
        createReviewRequesting: false,
      }

    default:
      return state
  }
}

export default reducer
