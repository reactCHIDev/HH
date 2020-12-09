import { put, takeEvery, delay } from 'redux-saga/effects'

import { updateShop, getShopByFoodmakerIdReq } from 'api/requests/Shop'

import {
  UPDATE_SHOP_REQUESTING,
  UPDATE_SHOP_SUCCESS,
  UPDATE_SHOP_ERROR,
  GET_SHOP_BY_FM_ID_REQUESTING,
  GET_SHOP_BY_FM_ID_SUCCESS,
  GET_SHOP_BY_FM_ID_ERROR,
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

function* getShopByFoodmakerIdSaga({ payload }) {
  try {
    const response = yield getShopByFoodmakerIdReq(payload)
    yield put({ type: GET_SHOP_BY_FM_ID_SUCCESS, payload: { data: response.data } })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_SHOP_BY_FM_ID_ERROR, error: error.response.data.error })
    }
  }
}

function* accountWatcher() {
  yield takeEvery(UPDATE_SHOP_REQUESTING, updateShopSaga)
  yield takeEvery(GET_SHOP_BY_FM_ID_REQUESTING, getShopByFoodmakerIdSaga)
}

export default accountWatcher
