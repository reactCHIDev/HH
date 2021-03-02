import { put, takeEvery } from 'redux-saga/effects'
import { getFMBookingHistory, getFLBookingHistory } from 'api/requests/Experience'

import {
  GET_FM_BOOKING_HISTORY_REQUESTING,
  GET_FM_BOOKING_HISTORY_SUCCESS,
  GET_FM_BOOKING_HISTORY_ERROR,
  GET_FL_BOOKING_HISTORY_REQUESTING,
  GET_FL_BOOKING_HISTORY_SUCCESS,
  GET_FL_BOOKING_HISTORY_ERROR,
} from '../actions/constants'

function* getFMBookingHistorySaga() {
  try {
    const response = yield getFMBookingHistory()
    yield put({
      type: GET_FM_BOOKING_HISTORY_SUCCESS,
      data: response.data.bookings.map(({ ...data }) => ({
        adults: data.guests.adults || 0,
        childs: data.guests.childs || 0,
        id: data.id,
        title: data.experience.title,
        photo: data.experience.coverPhoto,
        time: data.time,
        price: data.totalPrice,
        guests: data.guests.adults || 0 + data.guests.childs || 0,
      })),
    })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FM_BOOKING_HISTORY_ERROR, error: error.response.data.error })
    }
  }
}
function* getFLBookingHistorySaga() {
  try {
    const response = yield getFLBookingHistory()
    // console.log(response, 'response')
    yield put({
      type: GET_FL_BOOKING_HISTORY_SUCCESS,
      data: response.data.bookings.map(({ ...data }) => ({
        adults: data.guests.adults || 0,
        childs: data.guests.childs || 0,
        id: data.id,
        title: data.experience.title,
        photo: data.experience.coverPhoto,
        time: data.time,
        price: data.totalPrice,
        guests: data.guests.adults || 0 + data.guests.childs || 0,
      })),
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
