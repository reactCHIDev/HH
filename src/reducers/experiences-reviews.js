import {
  GET_EXPERIENCE_REVIEW_REQUESTING,
  GET_EXPERIENCE_REVIEW_SUCCESS,
  GET_EXPERIENCE_REVIEW_ERROR,
} from '../actions/constants'

const initialState = {
  requesting: false,
  eroror: '',
  expReviews: [],
}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
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

    default:
      return state
  }
}

export default reducer
