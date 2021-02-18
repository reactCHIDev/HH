import {
  GET_FM_BOOKING_HISTORY_REQUESTING,
  GET_FM_BOOKING_HISTORY_SUCCESS,
  GET_FM_BOOKING_HISTORY_ERROR,
} from './constants'

export const getFmBookingHistoryAC = () => ({
  type: GET_FM_BOOKING_HISTORY_REQUESTING,
})

export const getFmBookingHistorySuccess = (payload) => ({
  type: GET_FM_BOOKING_HISTORY_SUCCESS,
  payload,
})

export const getFmBookingHistoryError = (payload) => ({
  type: GET_FM_BOOKING_HISTORY_ERROR,
  payload,
})
