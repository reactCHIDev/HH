import { put, takeEvery } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import { removeKey } from '../utils/localStorage'

import PATHS from 'api/paths'

import { createProductReq, getProductInfoReq } from 'api/requests/Product'
import { createProductSuccess, createProductError } from 'actions/product'

import {
  CREATE_PRODUCT_REQUESTING,
  GET_PRODUCT_INFO_REQUESTING,
  GET_PRODUCT_INFO_SUCCESS,
  GET_PRODUCT_INFO_ERROR,
} from '../actions/constants'

function* createProductSaga({ payload }) {
  try {
    yield createProductReq(payload)
    yield put(createProductSuccess())
    removeKey('addProduct')
    yield put(replace('/card'))
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

function* accountWatcher() {
  yield takeEvery(CREATE_PRODUCT_REQUESTING, createProductSaga)
  yield takeEvery(GET_PRODUCT_INFO_REQUESTING, getProductInfoSaga)
}

export default accountWatcher
