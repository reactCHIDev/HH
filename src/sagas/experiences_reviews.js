import { put, takeEvery } from 'redux-saga/effects'
import { getExperienceReviews, getFoodmakerExperiencesReviews } from 'api/requests/Experience'

import {
  GET_EXPERIENCE_REVIEW_REQUESTING,
  GET_EXPERIENCE_REVIEW_SUCCESS,
  GET_EXPERIENCE_REVIEW_ERROR,
} from '../actions/constants'

function* getExperiencesReviewsSage({ payload }) {
  const { page, type } = payload
  // console.log(type, 'TYPE')
  try {
    const response =
      type === 'fmExperiencesReview'
        ? yield getFoodmakerExperiencesReviews()
        : yield getExperienceReviews()

    console.log(response, 'response')
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
