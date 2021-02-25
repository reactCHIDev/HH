import {
  GET_BOOKING_BY_DATE_REQUESTING,
  GET_BOOKING_BY_DATE_SUCCESS,
  GET_BOOKING_BY_DATE_ERROR,
} from '../actions/constants'

const initialState = {
  requesting: false,
  error: '',
}

const reducer = function experienceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKING_BY_DATE_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_BOOKING_BY_DATE_SUCCESS:
      return {
        ...state,
        bookingByDate: action.data,
        requesting: false,
        error: '',
      }
    case GET_BOOKING_BY_DATE_ERROR:
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
