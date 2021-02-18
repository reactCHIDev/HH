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
  GET_PRODUCT_REVIEWS_SUCCESS,
  GET_PRODUCT_REVIEWS_ERROR,
} from 'actions/constants'

const initialState = {
  unreviewedProduct: null,
  reviews: null,
  productReviews: null,
  productReviewsCount: null,
  reviewsCount: null,
  requesting: false,
  error: false,
  createReviewRequesting: false,
  isModalOpen: false,
  currentPage: 1,
  reviewsCurrentPage: 1,
  isUserCanReview: true,
  count: null,
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
        count: action.data.count,
        requesting: false,
        error: false,
        reviewsCurrentPage: action.data.currentProductPage,
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

    case GET_PRODUCT_REVIEWS_SUCCESS:
      return {
        ...state,
        productReviews: action.data.reviews,
        productReviewsCount: action.data.count,
        currentPage: action.data.currentProductPage,
        isUserCanReview: action.data.isUserCanReview,
      }

    case GET_PRODUCT_REVIEWS_ERROR:
      return {
        ...state,
        error: true,
      }

    default:
      return state
  }
}

export default reducer
