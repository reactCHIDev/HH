import { put, takeEvery } from 'redux-saga/effects'
import {
  getFoodmakerOrdersReq,
  getFoodmakerOrderInfoReq,
  changeDeliveryStatusReq,
} from 'api/requests/foodmaker'

import {
  GET_FOODMAKER_ORDERS_REQUESTING,
  GET_FOODMAKER_ORDERS_SUCCESS,
  GET_FOODMAKER_ORDERS_ERROR,
  GET_FM_ORDER_REQUESTING,
  GET_FM_ORDER_SUCCESS,
  GET_FM_ORDER_ERROR,
  CHANGE_DELIVERY_STATUS,
} from '../actions/constants'

function* getFoodmakerOrdersSaga() {
  try {
    const response = yield getFoodmakerOrdersReq({ startD: '2021-01-01', endD: '2021-12-31' })
    yield put({ type: GET_FOODMAKER_ORDERS_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FOODMAKER_ORDERS_ERROR, error: error.response.data.error })
    }
  }
}

function* getFoodmakerOrderSaga({ payload }) {
  try {
    const response = yield getFoodmakerOrderInfoReq(payload)
    yield put({ type: GET_FM_ORDER_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FM_ORDER_ERROR, error: error.response.data.error })
    }
  }
}

function* changeDeliveryStatusSaga({ data }) {
  const { id: orderId, delStatus: deliveryStatus } = data
  yield changeDeliveryStatusReq({ orderId, deliveryStatus })
}

function* foodmakerOrdersWatcher() {
  yield takeEvery(GET_FOODMAKER_ORDERS_REQUESTING, getFoodmakerOrdersSaga)
  yield takeEvery(GET_FM_ORDER_REQUESTING, getFoodmakerOrderSaga)
  yield takeEvery(CHANGE_DELIVERY_STATUS, changeDeliveryStatusSaga)
}

export default foodmakerOrdersWatcher
