import { put, takeEvery } from 'redux-saga/effects'
import { getUnreviewedProductReq } from 'api/requests/Review'

import {
  GET_UNREVIEWED_PRODUCT_REQUESTING,
  GET_UNREVIEWED_PRODUCT_SUCCESS,
  GET_UNREVIEWED_PRODUCT_ERROR,
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

function* reviewsWatcher() {
  yield takeEvery(GET_UNREVIEWED_PRODUCT_REQUESTING, getUnreviewedProduct)
}

export default reviewsWatcher
