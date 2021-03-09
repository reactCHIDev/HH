import {
  GET_EXPERIENCE_REVIEW_REQUESTING,
  GET_EXPERIENCE_REVIEW_SUCCESS,
  GET_EXPERIENCE_REVIEW_ERROR,
  GET_UNREVIEWED_EXPERIENCE_REQUESTING,
  GET_UNREVIEWED_EXPERIENCE_SUCCESS,
  GET_UNREVIEWED_EXPERIENCE_ERROR,
  CREATE_EXPERIENCE_REVIEW_REQUESTING,
  CREATE_EXPERIENCE_REVIEW_SUCCESS,
  CREATE_EXPERIENCE_REVIEW_ERROR,
  GET_FL_EXPERIENCE_REVIEWS_REQUESTING,
  GET_FL_EXPERIENCE_REVIEWS_SUCCESS,
  GET_FL_EXPERIENCE_REVIEWS_ERROR,
} from '../actions/constants'

const initialState = {
  requesting: false,
  eroror: '',
  expReviews: [],
  unreviewedExperience: null,
  currentPage: 1,
  reviewsCurrentPage: 1,
  createReviewRequesting: false,
  isModalOpen: false,
}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_UNREVIEWED_EXPERIENCE_REQUESTING:
      return {
        ...state,
        requesting: true,
        success: false,
        error: false,
      }
    case GET_UNREVIEWED_EXPERIENCE_SUCCESS:
      return {
        ...state,
        unreviewedExperience: action.data,
        requesting: false,
        error: false,
      }

    case GET_UNREVIEWED_EXPERIENCE_ERROR:
      return {
        ...state,
        requesting: false,
        error: true,
      }
    case GET_EXPERIENCE_REVIEW_REQUESTING:
      return {
        ...state,
        requesting: true,
      }
    case GET_EXPERIENCE_REVIEW_SUCCESS:
      return {
        ...state,
        expReviews: action.data,
        requesting: false,
      }
    case GET_EXPERIENCE_REVIEW_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case CREATE_EXPERIENCE_REVIEW_REQUESTING:
      return {
        ...state,
        createReviewRequesting: true,
      }
    case CREATE_EXPERIENCE_REVIEW_SUCCESS:
      return {
        ...state,
        createReviewRequesting: false,
        isModalOpen: false,
      }

    case CREATE_EXPERIENCE_REVIEW_ERROR:
      return {
        ...state,
        createReviewRequesting: false,
      }

    case GET_FL_EXPERIENCE_REVIEWS_REQUESTING:
      return {
        ...state,
        requesting: true,
        success: false,
        error: false,
      }
    case GET_FL_EXPERIENCE_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.data.reviews,
        count: action.data.count,
        requesting: false,
        error: false,
        reviewsCurrentPage: action.data.currentProductPage,
      }

    case GET_FL_EXPERIENCE_REVIEWS_ERROR:
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
