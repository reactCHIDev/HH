import { put, takeEvery, takeLatest } from 'redux-saga/effects'
import PATHS from 'api/paths'

import { getProductTypesReq, getMyProductListReq } from 'api/requests/Listing'
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
    const response = yield getProductTypesReq()
    // const list = yield getMyProductListReq()
    yield put({ type: GET_PRODUCT_TYPES_SUCCESS, data: response.data })
    // yield put({ type: GET_MY_PRODUCT_LIST_REQUESTING })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_PRODUCT_TYPES_ERROR, error: error.response.data.error })
    }
  }
}

function* getMyProductListSaga() {
  console.log('saga 1')
  try {
    const response = yield getMyProductListReq()
    console.log('saga 2', response.data)
    yield put({ type: GET_MY_PRODUCT_LIST_SUCCESS, data: response.data })
    // yield put(getMyProductListSuccess({ data: response.data }))
  } catch (error) {
    console.log('error', error)
    if (error.response) {
      yield put({ type: GET_MY_PRODUCT_LIST_ERROR, error: error.response.data.error })
    }
  }
}

function* listingWatcher() {
  yield takeEvery(GET_PRODUCT_TYPES_REQUESTING, getProductTypeSaga)
  yield takeEvery(GET_MY_PRODUCT_LIST_REQUESTING, getMyProductListSaga)
}

export default listingWatcher
