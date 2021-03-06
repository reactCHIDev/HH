import { put, takeEvery } from 'redux-saga/effects'
import {
  getFMBookingHistory,
  getFLBookingHistory,
  getPastFLBookingHistory,
  getPastFMBookingHistory,
} from 'api/requests/Experience'

import {
  GET_FM_BOOKING_HISTORY_REQUESTING,
  GET_FM_BOOKING_HISTORY_SUCCESS,
  GET_FM_BOOKING_HISTORY_ERROR,
  GET_FL_BOOKING_HISTORY_REQUESTING,
  GET_FL_BOOKING_HISTORY_SUCCESS,
  GET_FL_BOOKING_HISTORY_ERROR,
} from '../actions/constants'

function* getFMBookingHistorySaga({ payload }) {
  const { page, showPast } = payload

  try {
    const response = showPast
      ? yield getPastFMBookingHistory({ startIndex: page * 5 - 5, limit: 5 })
      : yield getFMBookingHistory({ startIndex: page * 5 - 5, limit: 5 })
    yield put({
      type: GET_FM_BOOKING_HISTORY_SUCCESS,
      data: {
        bookings: response.data.bookings.map(({ ...data }) => ({
          adults: data.guests.adults || 0,
          childs: data.guests.children || 0,
          id: data.id,
          title: data.experience.title,
          photo: data.experience.coverPhoto,
          time: data.time,
          price: data.totalPrice,
          guests: data.guests.adults || 0 + data.guests.children || 0,
        })),
        counter: response.data.counter,
        page,
      },
    })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FM_BOOKING_HISTORY_ERROR, error: error.response.data.error })
    }
  }
}
function* getFLBookingHistorySaga({ payload }) {
  const { page, showPast } = payload

  try {
    const response = showPast
      ? yield getPastFLBookingHistory({ startIndex: page * 5 - 5, limit: 5 })
      : yield getFLBookingHistory({ startIndex: page * 5 - 5, limit: 5 })

    yield put({
      type: GET_FL_BOOKING_HISTORY_SUCCESS,
      data: {
        bookings: response.data.bookings.map(({ ...data }) => ({
          adults: data.guests.adults || 0,
          childs: data.guests.children || 0,
          id: data.id,
          title: data.experience.title,
          photo: data.experience.coverPhoto,
          time: data.time,
          price: data.totalPrice,
          guests: data.guests.adults || 0 + data.guests.children || 0,
        })),
        counter: response.data.counter,
        page,
      },
    })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FL_BOOKING_HISTORY_ERROR, error: error.response.data.error })
    }
  }
}

function* fmBookingHistoryWatcher() {
  yield takeEvery(GET_FM_BOOKING_HISTORY_REQUESTING, getFMBookingHistorySaga)
  yield takeEvery(GET_FL_BOOKING_HISTORY_REQUESTING, getFLBookingHistorySaga)
}

export default fmBookingHistoryWatcher
