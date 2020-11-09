import { put, takeEvery } from 'redux-saga/effects'
import PATHS from 'api/paths'

import { getProductTypes, getMyProductListReq } from 'api/requests/Listing'

import {
  GET_PRODUCT_TYPES_REQUESTING,
  GET_PRODUCT_TYPES_SUCCESS,
  GET_PRODUCT_TYPES_ERROR,
} from '../actions/constants'

function* getProductTypeSaga() {
  try {
    const response = yield getProductTypes()
    yield put({ type: GET_PRODUCT_TYPES_SUCCESS, data: response.data })
    const list = yield getMyProductListReq()
    console.log('%c   list   ', 'color: white; background: salmon;', list.data)
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_PRODUCT_TYPES_ERROR, error: error.response.data.error })
    }
  }
}

function* accountWatcher() {
  yield takeEvery(GET_PRODUCT_TYPES_REQUESTING, getProductTypeSaga)
}

export default accountWatcher
