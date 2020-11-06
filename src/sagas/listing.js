import { put, takeEvery } from 'redux-saga/effects'
import PATHS from 'api/paths'

import { getProductTypes } from 'api/requests/Listing'

import {
  GET_PRODUCT_TYPES_REQUESTING,
  GET_PRODUCT_TYPES_SUCCESS,
  GET_PRODUCT_TYPES_ERROR,
} from '../actions/constants'

function* getProductTypeSaga() {
  try {
    console.log('%c   req   ', 'color: white; background: salmon;')
    const response = yield getProductTypes()
    yield put({ type: GET_PRODUCT_TYPES_SUCCESS, data: response.data })
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
