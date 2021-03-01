import { put, takeEvery } from 'redux-saga/effects'
import { getExperienceReviews, getFoodmakerExperiencesReviews } from 'api/requests/Experience'

import {
  GET_EXPERIENCE_REVIEW_REQUESTING,
  GET_EXPERIENCE_REVIEW_SUCCESS,
  GET_EXPERIENCE_REVIEW_ERROR,
} from '../actions/constants'

function* getExperiencesReviewsSage({ payload }) {
  const { page, type, id } = payload
  try {
    const response =
      type === 'fmExperiencesReview'
        ? yield getFoodmakerExperiencesReviews({ startIndex: page * 3 - 3, limit: 3 })
        : yield getExperienceReviews({ id, startIndex: page * 3 - 3, limit: 3 })

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
