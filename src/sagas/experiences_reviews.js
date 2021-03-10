import { put, takeEvery, select } from 'redux-saga/effects'
import {
  getExperienceReviews,
  getFoodmakerExperiencesReviews,
  getUnreviewedExperienceReq,
  createExperienceReviewReq,
  getFLExperienceReviewsReq,
} from 'api/requests/Experience'

import {
  GET_EXPERIENCE_REVIEW_REQUESTING,
  GET_EXPERIENCE_REVIEW_SUCCESS,
  GET_EXPERIENCE_REVIEW_ERROR,
  GET_UNREVIEWED_EXPERIENCE_REQUESTING,
  GET_UNREVIEWED_EXPERIENCE_SUCCESS,
  GET_UNREVIEWED_EXPERIENCE_ERROR,
  CREATE_EXPERIENCE_REVIEW_REQUESTING,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_EXPERIENCE_REVIEW_ERROR,
  GET_FL_EXPERIENCE_REVIEWS_REQUESTING,
  GET_FL_EXPERIENCE_REVIEWS_SUCCESS,
  GET_FL_EXPERIENCE_REVIEWS_ERROR,
} from '../actions/constants'

function* getUnreviewedExperienceSaga() {
  try {
    const { data } = yield getUnreviewedExperienceReq()
    yield put({ type: GET_UNREVIEWED_EXPERIENCE_SUCCESS, data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_UNREVIEWED_EXPERIENCE_ERROR })
    }
  }
}

function* createProductReview({ payload }) {
  const getReviewsData = (store) => store.reviews
  const { currentPage, reviewsCurrentPage } = yield select(getReviewsData)
  try {
    yield createExperienceReviewReq(payload)
    if (payload.isReviewOnProductPage) {
      yield put({
        type: GET_EXPERIENCE_REVIEW_REQUESTING,
        data: { id: payload.productId, page: 1 },
      })
      yield put({ type: CREATE_PRODUCT_REVIEW_SUCCESS })
    } else {
      yield put({
        type: GET_UNREVIEWED_EXPERIENCE_REQUESTING,
      })
      yield put({ type: GET_FL_EXPERIENCE_REVIEWS_REQUESTING, data: { page: reviewsCurrentPage } })
      yield put({ type: CREATE_PRODUCT_REVIEW_SUCCESS })
    }
  } catch (error) {
    if (error.response) {
      yield put({ type: CREATE_EXPERIENCE_REVIEW_ERROR })
    }
  }
}

function* getExperiencesReviewsSaga({ payload }) {
  const { page, type, id } = payload
  try {
    const { data } =
      type === 'fmExperiencesReview'
        ? yield getFoodmakerExperiencesReviews({ startIndex: page * 3 - 3, limit: 3 })
        : yield getExperienceReviews({ id, startIndex: page * 3 - 3, limit: 3 })

    yield put({
      type: GET_EXPERIENCE_REVIEW_SUCCESS,
      payload: {
        expReviews: data.reviews,
        expCount: data.counter,
        expCurrentPage: 9,
      },
    })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_EXPERIENCE_REVIEW_ERROR, error: error.response.data.error })
    }
  }
}

function* getFlExperiencesReviews({ payload }) {
  const { page } = payload

  try {
    const { data: products } = yield getFLExperienceReviewsReq({
      startIndex: page * 3 - 3,
      limit: 3,
    })
    yield put({
      type: GET_FL_EXPERIENCE_REVIEWS_SUCCESS,
      data: {
        reviews: products.reviews,
        count: products.counter,
        currentProductPage: page,
      },
    })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FL_EXPERIENCE_REVIEWS_ERROR })
    }
  }
}

function* getExperiencesReviewsWatcher() {
  yield takeEvery(GET_EXPERIENCE_REVIEW_REQUESTING, getExperiencesReviewsSaga)
  yield takeEvery(GET_UNREVIEWED_EXPERIENCE_REQUESTING, getUnreviewedExperienceSaga)
  yield takeEvery(CREATE_EXPERIENCE_REVIEW_REQUESTING, createProductReview)
  yield takeEvery(GET_FL_EXPERIENCE_REVIEWS_REQUESTING, getFlExperiencesReviews)
}

export default getExperiencesReviewsWatcher
