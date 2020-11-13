import { put, takeEvery } from 'redux-saga/effects'
import PATHS from 'api/paths'

import { createProductReq } from 'api/requests/Product'
import { createProductSuccess, createProductError } from 'actions/product'
import { getMyProductList, getMyProductListSuccess } from 'actions/listing'

import { CREATE_PRODUCT_REQUESTING } from '../actions/constants'

function* createProductSaga({ payload }) {
  try {
    yield createProductReq(payload)
    yield put(createProductSuccess())
    // yield put(getMyProductList())
    // yield put(getMyProductListSuccess())
    console.log('%c   Product cteated  !!! ', 'color: darkgreen; background: palegreen;')
  } catch (error) {
    if (error.response) {
      yield put(createProductError())
    }
  }
}

function* accountWatcher() {
  yield takeEvery(CREATE_PRODUCT_REQUESTING, createProductSaga)
}

export default accountWatcher
