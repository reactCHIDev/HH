import { put, takeEvery } from 'redux-saga/effects'
import { getUnreviewedProductReq, createProductReviewReq } from 'api/requests/Review'

import {
  GET_UNREVIEWED_PRODUCT_REQUESTING,
  GET_UNREVIEWED_PRODUCT_SUCCESS,
  GET_UNREVIEWED_PRODUCT_ERROR,
  CREATE_PRODUCT_REVIEW_REQUESTING,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_ERROR,
} from '../actions/constants'

function* getUnreviewedProduct() {
  try {
    const { data } = yield getUnreviewedProductReq()
    yield put({ type: GET_UNREVIEWED_PRODUCT_SUCCESS, data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_UNREVIEWED_PRODUCT_ERROR })
    }
  }
}

function* createProductReview({ data }) {
  try {
    yield createProductReviewReq(data)
    yield put({ type: GET_UNREVIEWED_PRODUCT_REQUESTING })
    yield put({ type: CREATE_PRODUCT_REVIEW_SUCCESS })
  } catch (error) {
    if (error.response) {
      yield put({ type: CREATE_PRODUCT_REVIEW_ERROR })
    }
  }
}

function* reviewsWatcher() {
  yield takeEvery(GET_UNREVIEWED_PRODUCT_REQUESTING, getUnreviewedProduct)
  yield takeEvery(CREATE_PRODUCT_REVIEW_REQUESTING, createProductReview)
}

export default reviewsWatcher
