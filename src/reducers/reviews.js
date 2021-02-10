import {
  GET_UNREVIEWED_PRODUCT_REQUESTING,
  GET_UNREVIEWED_PRODUCT_SUCCESS,
  GET_UNREVIEWED_PRODUCT_ERROR,
  CREATE_PRODUCT_REVIEW_REQUESTING,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_ERROR,
  GET_FL_REVIEWS_REQUESTING,
  GET_FL_REVIEWS_SUCCESS,
  GET_FL_REVIEWS_ERROR,
  OPEN_REVIEW_MODAL,
} from 'actions/constants'

const initialState = {
  unreviewedProduct: null,
  reviews: null,
  reviewsCount: null,
  requesting: false,
  error: false,
  createReviewRequesting: false,
  isModalOpen: false,
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
        isModalOpen: false,
      }

    case CREATE_PRODUCT_REVIEW_ERROR:
      return {
        ...state,
        createReviewRequesting: false,
      }

    case GET_FL_REVIEWS_REQUESTING:
      return {
        ...state,
        requesting: true,
        success: false,
        error: false,
      }
    case GET_FL_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.data.reviews,
        count: action.data.reviewsCount,
        requesting: false,
        error: false,
      }

    case GET_FL_REVIEWS_ERROR:
      return {
        ...state,
        requesting: false,
        error: true,
      }

    case OPEN_REVIEW_MODAL:
      return {
        ...state,
        isModalOpen: true,
      }

    default:
      return state
  }
}

export default reducer
