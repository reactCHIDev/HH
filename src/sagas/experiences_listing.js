import { put, takeEvery } from 'redux-saga/effects'
import { getMyExperiencesListReq, toggleExperienceStatus } from 'api/requests/ExperiencesListing'

import {
  GET_MY_EXPERIENCES_LIST_REQUESTING,
  GET_MY_EXPERIENCES_LIST_SUCCESS,
  GET_MY_EXPERIENCES_LIST_ERROR,
  TOGGLE_EXPERIENCE_STATUS_REQUESTING,
  TOGGLE_EXPERIENCE_STATUS_ERROR,
} from '../actions/constants'

function* getMyExperiencesListSaga() {
  try {
    const response = yield getMyExperiencesListReq()
    yield put({
      type: GET_MY_EXPERIENCES_LIST_SUCCESS,
      data: { experiences: response.data.experiences, counter: response.data.counter },
    })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_MY_EXPERIENCES_LIST_ERROR, error: error.response.data.error })
    }
  }
}

function* toggleExperienceStatusSaga({ payload }) {
  try {
    yield toggleExperienceStatus({ id: payload })
    yield put({ type: GET_MY_EXPERIENCES_LIST_REQUESTING })
  } catch (error) {
    if (error.response) {
      yield put({ type: TOGGLE_EXPERIENCE_STATUS_ERROR, error: error.response.data.error })
    }
  }
}

function* listingWatcher() {
  yield takeEvery(GET_MY_EXPERIENCES_LIST_REQUESTING, getMyExperiencesListSaga)
  yield takeEvery(TOGGLE_EXPERIENCE_STATUS_REQUESTING, toggleExperienceStatusSaga)
}

export default listingWatcher
