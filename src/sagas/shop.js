import { put, takeEvery, delay } from 'redux-saga/effects'

import { updateShop } from 'api/requests/Shop'

import {
  UPDATE_SHOP_REQUESTING,
  UPDATE_SHOP_SUCCESS,
  UPDATE_SHOP_ERROR,
} from '../actions/constants'

function* updateShopSaga({ payload }) {
  try {
    const response = yield updateShop(payload)
    yield put({ type: UPDATE_SHOP_SUCCESS, payload: { data: response.data } })
    yield delay(3000)
    yield put({ type: 'RESET_SHOP_SUCCESS' })
  } catch (error) {
    if (error.response) {
      yield put({ type: UPDATE_SHOP_ERROR, error: error.response.data.error })
    }
  }
}

function* accountWatcher() {
  yield takeEvery(UPDATE_SHOP_REQUESTING, updateShopSaga)
}

export default accountWatcher
