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

    default:
      return state
  }
}

export default reducer
