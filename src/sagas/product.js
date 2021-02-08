import { put, takeEvery, delay } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import { removeKey } from '../utils/localStorage'

import PATHS from 'api/paths'

import {
  createProductReq,
  updateProductReq,
  getProductInfoReq,
  toggleProductStatus,
  duplicate,
} from 'api/requests/Product'
import {
  createProductSuccess,
  createProductError,
  updateProductSuccess,
  updateProductError,
} from 'actions/product'

import {
  CREATE_PRODUCT_REQUESTING,
  UPDATE_PRODUCT_REQUESTING,
  GET_PRODUCT_INFO_REQUESTING,
  GET_PRODUCT_INFO_SUCCESS,
  GET_PRODUCT_INFO_ERROR,
  TOGGLE_PRODUCT_STATUS_REQUESTING,
  TOGGLE_PRODUCT_STATUS_SUCCESS,
  TOGGLE_PRODUCT_STATUS_ERROR,
  DUPLICATE_PRODUCT_REQUESTING,
  DUPLICATE_PRODUCT_SUCCESS,
  DUPLICATE_PRODUCT_ERROR,
} from '../actions/constants'

function* createProductSaga({ payload }) {
  try {
    yield createProductReq(payload)
    yield put(createProductSuccess())
    removeKey('addProduct')
    yield put(replace('/product_dashboard/listings'))
  } catch (error) {
    if (error.response) {
      yield put(createProductError())
    }
  }
}

function* updateProductSaga({ payload }) {
  try {
    yield updateProductReq(payload)
    yield put(updateProductSuccess())
    removeKey('addProduct')
    yield put(replace('/product_dashboard/listings'))
  } catch (error) {
    if (error.response) {
      yield put(updateProductError())
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

function* toggleProductStatusSaga({ payload }) {
  try {
    yield toggleProductStatus({ id: payload })
    yield put({ type: 'GET_MY_PRODUCT_LIST_REQUESTING' })
  } catch (error) {
    if (error.response) {
      yield put({ type: TOGGLE_PRODUCT_STATUS_ERROR, error: error.response.data.error })
    }
  }
}

function* duplicateProductSaga({ payload }) {
  try {
    yield duplicate(payload)
    yield put({ type: DUPLICATE_PRODUCT_SUCCESS })
    yield delay(3000)
    yield put({ type: 'RESET_DUPLICATE_SUCCESS' })
    yield put(replace('/product_dashboard/listings'))
  } catch (error) {
    if (error.response) {
      yield put({ type: DUPLICATE_PRODUCT_ERROR, error: error.response.data.error })
    }
  }
}

function* accountWatcher() {
  yield takeEvery(CREATE_PRODUCT_REQUESTING, createProductSaga)
  yield takeEvery(UPDATE_PRODUCT_REQUESTING, updateProductSaga)
  yield takeEvery(GET_PRODUCT_INFO_REQUESTING, getProductInfoSaga)
  yield takeEvery(TOGGLE_PRODUCT_STATUS_REQUESTING, toggleProductStatusSaga)
  yield takeEvery(DUPLICATE_PRODUCT_REQUESTING, duplicateProductSaga)
}

export default accountWatcher
