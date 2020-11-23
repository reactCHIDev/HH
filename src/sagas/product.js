import { put, takeEvery } from 'redux-saga/effects'
import PATHS from 'api/paths'

import { createProductReq, getProductInfoReq, getProductTagsReq } from 'api/requests/Product'
import { createProductSuccess, createProductError } from 'actions/product'

import {
  CREATE_PRODUCT_REQUESTING,
  GET_PRODUCT_INFO_REQUESTING,
  GET_PRODUCT_INFO_SUCCESS,
  GET_PRODUCT_INFO_ERROR,
  GET_PRODUCT_TAGS_REQUESTING,
  GET_PRODUCT_TAGS_SUCCESS,
  GET_PRODUCT_TAGS_ERROR,
} from '../actions/constants'

function* createProductSaga({ payload }) {
  try {
    yield createProductReq(payload)
    yield put(createProductSuccess())
  } catch (error) {
    if (error.response) {
      yield put(createProductError())
    }
  }
}

function* getProductInfoSaga({ id }) {
  try {
    const response = yield getProductInfoReq(id)
    yield put({ type: GET_PRODUCT_INFO_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_PRODUCT_INFO_ERROR, error: error.response.data.error })
    }
  }
}

function* getProductTagsSaga() {
  try {
    const response = yield getProductTagsReq()
    yield put({ type: GET_PRODUCT_TAGS_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_PRODUCT_TAGS_ERROR, error: error.response.data.error })
    }
  }
}

function* accountWatcher() {
  yield takeEvery(CREATE_PRODUCT_REQUESTING, createProductSaga)
  yield takeEvery(GET_PRODUCT_INFO_REQUESTING, getProductInfoSaga)
  yield takeEvery(GET_PRODUCT_TAGS_REQUESTING, getProductTagsSaga)
}

export default accountWatcher
