import { put, takeEvery } from 'redux-saga/effects'
import PATHS from 'api/paths'

import { getMyProductListReq } from 'api/requests/Listing'

import {
  GET_MY_PRODUCT_LIST_REQUESTING,
  GET_MY_PRODUCT_LIST_SUCCESS,
  GET_MY_PRODUCT_LIST_ERROR,
} from '../actions/constants'

function* getMyProductListSaga() {
  try {
    const response = yield getMyProductListReq()
    yield put({ type: GET_MY_PRODUCT_LIST_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_MY_PRODUCT_LIST_ERROR, error: error.response.data.error })
    }
  }
}

function* listingWatcher() {
  yield takeEvery(GET_MY_PRODUCT_LIST_REQUESTING, getMyProductListSaga)
}

export default listingWatcher
