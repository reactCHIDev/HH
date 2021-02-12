import {
  GET_FM_BOOKING_HISTORY_REQUESTING,
  GET_FM_BOOKING_HISTORY_SUCCESS,
  GET_FM_BOOKING_HISTORY_ERROR,
} from '../actions/constants'

const initialState = {
  requesting: false,
  eroror: '',
  bookings: [],
}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FM_BOOKING_HISTORY_REQUESTING:
      return {
        ...state,
        requesting: true,
      }
    case GET_FM_BOOKING_HISTORY_SUCCESS:
      return {
        ...state,
        orders: action.data,
        requesting: false,
      }
    case GET_FM_BOOKING_HISTORY_ERROR:
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
