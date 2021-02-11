import { put, takeEvery, select } from 'redux-saga/effects'
import {
  getUnreviewedProductReq,
  createProductReviewReq,
  getFlProductsReviewsReq,
  getProductReviewsReq,
} from 'api/requests/Review'

import {
  GET_UNREVIEWED_PRODUCT_REQUESTING,
  GET_UNREVIEWED_PRODUCT_SUCCESS,
  GET_UNREVIEWED_PRODUCT_ERROR,
  CREATE_PRODUCT_REVIEW_REQUESTING,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_ERROR,
  GET_FL_REVIEWS_REQUESTING,
  GET_FL_REVIEWS_SUCCESS,
  GET_FL_REVIEWS_ERROR,
  GET_PRODUCT_REVIEWS_REQUESTING,
  GET_PRODUCT_REVIEWS_SUCCESS,
  GET_PRODUCT_REVIEWS_ERROR,
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
  const getReviewsData = (store) => store.reviews
  const { currentPage } = yield select(getReviewsData)
  try {
    yield createProductReviewReq(data)
    if (data.isReviewOnProductPage) {
      yield put({
        type: GET_PRODUCT_REVIEWS_REQUESTING,
        data: { id: data.productId, page: currentPage },
      })
      yield put({ type: CREATE_PRODUCT_REVIEW_SUCCESS })
    } else {
      yield put({ type: GET_UNREVIEWED_PRODUCT_REQUESTING })
      yield put({ type: GET_FL_REVIEWS_REQUESTING })
      yield put({ type: CREATE_PRODUCT_REVIEW_SUCCESS })
    }
  } catch (error) {
    if (error.response) {
      yield put({ type: CREATE_PRODUCT_REVIEW_ERROR })
    }
  }
}

function* getFlProductReviews() {
  try {
    const { data } = yield getFlProductsReviewsReq({ startIndex: 0, limit: 6 })
    yield put({
      type: GET_FL_REVIEWS_SUCCESS,
      data: { reviews: data.reviews, count: data.reviewsCount },
    })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FL_REVIEWS_ERROR })
    }
  }
}

function* getProductReviews({ data }) {
  const { id, page } = data
  try {
    const response = yield getProductReviewsReq({ id, startIndex: page * 3 - 3, limit: 3 })
    console.log(response)
    yield put({
      type: GET_PRODUCT_REVIEWS_SUCCESS,
      data: {
        reviews: response.data.reviews,
        count: response.data.reviewsCount,
        currentProductPage: page,
        isUserCanReview: !response.data.isReviewed,
      },
    })
  } catch (error) {
    if (error.response) {
      console.log('error')
      yield put({ type: GET_PRODUCT_REVIEWS_ERROR, error: error.response.data.error })
    }
  }
}

function* reviewsWatcher() {
  yield takeEvery(GET_UNREVIEWED_PRODUCT_REQUESTING, getUnreviewedProduct)
  yield takeEvery(CREATE_PRODUCT_REVIEW_REQUESTING, createProductReview)
  yield takeEvery(GET_FL_REVIEWS_REQUESTING, getFlProductReviews)
  yield takeEvery(GET_PRODUCT_REVIEWS_REQUESTING, getProductReviews)
}

export default reviewsWatcher
