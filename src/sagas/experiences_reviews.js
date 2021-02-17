import { put, takeEvery } from 'redux-saga/effects'
import { getExperiencesReviews } from 'api/requests/Account'

import {
  GET_EXPERIENCE_REVIEW_REQUESTING,
  GET_EXPERIENCE_REVIEW_SUCCESS,
  GET_EXPERIENCE_REVIEW_ERROR,
} from '../actions/constants'

function* getExperiencesReviewsSage() {
  try {
    const response = yield getExperiencesReviews()
    yield put({ type: GET_EXPERIENCE_REVIEW_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_EXPERIENCE_REVIEW_ERROR, error: error.response.data.error })
    }
  }
}

function* getExperiencesReviewsWatcher() {
  yield takeEvery(GET_EXPERIENCE_REVIEW_REQUESTING, getExperiencesReviewsSage)
}

export default getExperiencesReviewsWatcher
