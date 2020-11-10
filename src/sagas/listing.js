import { put, takeEvery, takeLatest } from 'redux-saga/effects'
import PATHS from 'api/paths'

import { getProductTypes, getMyProductListReq } from 'api/requests/Listing'
import { getMyProductListSuccess } from 'actions/listing'

import {
  GET_PRODUCT_TYPES_REQUESTING,
  GET_PRODUCT_TYPES_SUCCESS,
  GET_PRODUCT_TYPES_ERROR,
  GET_MY_PRODUCT_LIST_REQUESTING,
  GET_MY_PRODUCT_LIST_SUCCESS,
  GET_MY_PRODUCT_LIST_ERROR,
} from '../actions/constants'

function* getProductTypeSaga() {
  try {
    const response = yield getProductTypes()
    const list = yield getMyProductListReq()
    yield put({ type: GET_PRODUCT_TYPES_SUCCESS, data: response.data })
    yield put({ type: GET_MY_PRODUCT_LIST_SUCCESS, data: list.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_PRODUCT_TYPES_ERROR, error: error.response.data.error })
    }
  }
}

function* getMyProductListSaga() {
  try {
    const response = yield getMyProductListReq()
    yield put({ type: GET_MY_PRODUCT_LIST_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_PRODUCT_TYPES_ERROR, error: error.response.data.error })
    }
  }
}

function* accountWatcher() {
  yield takeEvery(GET_PRODUCT_TYPES_REQUESTING, getProductTypeSaga)
  // yield takeLatest(GET_MY_PRODUCT_LIST_REQUESTING, getMyProductListSaga)
}

export default accountWatcher
