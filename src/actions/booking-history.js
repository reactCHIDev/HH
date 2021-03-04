import {
  GET_FM_BOOKING_HISTORY_REQUESTING,
  GET_FM_BOOKING_HISTORY_SUCCESS,
  GET_FM_BOOKING_HISTORY_ERROR,
  GET_FL_BOOKING_HISTORY_REQUESTING,
  GET_FL_BOOKING_HISTORY_SUCCESS,
  GET_FL_BOOKING_HISTORY_ERROR,
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

export const getFlBookingHistoryAC = () => ({
  type: GET_FL_BOOKING_HISTORY_REQUESTING,
})

export const getFlBookingHistorySuccess = (payload) => ({
  type: GET_FL_BOOKING_HISTORY_SUCCESS,
  payload,
})

export const getFlBookingHistoryError = (payload) => ({
  type: GET_FL_BOOKING_HISTORY_ERROR,
  payload,
})
