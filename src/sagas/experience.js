import { put, takeEvery, delay } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import {
  createExperienceReq,
  updateExperienceReq,
  getExperiencesByDateReq,
  getExperienceByIdReq,
  getBookingByDateReq,
  createPublicBookingReq,
  getFMBookingInfoByIdReq,
  getFLBookingInfoByIdReq,
} from 'api/requests/Experience'
import { removeKey } from '../utils/localStorage'

import {
  CREATE_EXPERIENCE_REQUESTING,
  CREATE_EXPERIENCE_SUCCESS,
  CREATE_EXPERIENCE_ERROR,
  UPDATE_EXPERIENCE_REQUESTING,
  UPDATE_EXPERIENCE_SUCCESS,
  UPDATE_EXPERIENCE_ERROR,
  GET_EXPERIENCE_BY_DATE_REQUESTING,
  GET_EXPERIENCE_BY_DATE_SUCCESS,
  GET_EXPERIENCE_BY_DATE_ERROR,
  GET_EXPERIENCE_BY_ID_REQUESTING,
  GET_EXPERIENCE_BY_ID_SUCCESS,
  GET_EXPERIENCE_BY_ID_ERROR,
  GET_BOOKING_BY_DATE_REQUESTING,
  GET_BOOKING_BY_DATE_SUCCESS,
  GET_BOOKING_BY_DATE_ERROR,
  CREATE_PUBLIC_BOOKING_REQUESTING,
  CREATE_PUBLIC_BOOKING_SUCCESS,
  CREATE_PUBLIC_BOOKING_ERROR,
  GET_FM_BOOKING_INFO_REQUESTING,
  GET_FM_BOOKING_INFO_SUCCESS,
  GET_FM_BOOKING_INFO_ERROR,
  GET_FL_BOOKING_INFO_REQUESTING,
  GET_FL_BOOKING_INFO_SUCCESS,
  GET_FL_BOOKING_INFO_ERROR,
} from '../actions/constants'

function* createExperienceSaga({ payload }) {
  try {
    yield createExperienceReq(payload)
    yield put({ type: CREATE_EXPERIENCE_SUCCESS })
    removeKey('addExperience')
    yield put(replace('/experience_dashboard/listings'))
  } catch (error) {
    if (error.response) {
      yield put({ type: CREATE_EXPERIENCE_ERROR, error: error.response.data.error })
    }
  }
}

function* updateExperienceSaga({ payload }) {
  try {
    yield updateExperienceReq(payload)
    yield put({ type: UPDATE_EXPERIENCE_SUCCESS })
    removeKey('addExperience')
    yield put(replace('/experience_dashboard/listings'))
  } catch (error) {
    if (error.response) {
      yield put({ type: UPDATE_EXPERIENCE_ERROR, error: error.response.data.error })
    }
  }
}

function* getExperiencesByDateSaga({ payload }) {
  try {
    const response = yield getExperiencesByDateReq(payload)
    yield put({ type: GET_EXPERIENCE_BY_DATE_SUCCESS, payload: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_EXPERIENCE_BY_DATE_ERROR, error: error.response.data.error })
    }
  }
}

function* getExperienceByIdSaga({ payload }) {
  try {
    const response = yield getExperienceByIdReq(payload)
    yield put({ type: GET_EXPERIENCE_BY_ID_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_EXPERIENCE_BY_ID_ERROR, error: error.response.data.error })
    }
  }
}

function* getBookingByDateSaga({ id, date }) {
  try {
    const response = yield getBookingByDateReq(id, date)
    yield put({ type: GET_BOOKING_BY_DATE_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_BOOKING_BY_DATE_ERROR, error: error.response.data.error })
    }
  }
}

function* createPublicBookingSaga({ payload }) {
  try {
    const response = yield createPublicBookingReq(payload)
    yield delay(3000)
    yield put({ type: CREATE_PUBLIC_BOOKING_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: CREATE_PUBLIC_BOOKING_ERROR, error: error.response.data.error })
    }
  }
}

function* getFMBookingInfoSaga({ payload }) {
  try {
    const response = yield getFMBookingInfoByIdReq(payload)
    yield put({ type: GET_FM_BOOKING_INFO_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FM_BOOKING_INFO_ERROR, error: error.response.data.error })
    }
  }
}

function* getFLBookingInfoSaga({ payload }) {
  try {
    const response = yield getFLBookingInfoByIdReq(payload)
    yield put({ type: GET_FL_BOOKING_INFO_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FL_BOOKING_INFO_ERROR, error: error.response.data.error })
    }
  }
}

function* accountWatcher() {
  yield takeEvery(CREATE_EXPERIENCE_REQUESTING, createExperienceSaga)
  yield takeEvery(UPDATE_EXPERIENCE_REQUESTING, updateExperienceSaga)
  yield takeEvery(GET_EXPERIENCE_BY_DATE_REQUESTING, getExperiencesByDateSaga)
  yield takeEvery(GET_EXPERIENCE_BY_ID_REQUESTING, getExperienceByIdSaga)
  yield takeEvery(GET_BOOKING_BY_DATE_REQUESTING, getBookingByDateSaga)
  yield takeEvery(CREATE_PUBLIC_BOOKING_REQUESTING, createPublicBookingSaga)
  yield takeEvery(GET_FM_BOOKING_INFO_REQUESTING, getFMBookingInfoSaga)
  yield takeEvery(GET_FL_BOOKING_INFO_REQUESTING, getFLBookingInfoSaga)
}

export default accountWatcher
