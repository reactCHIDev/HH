import { put, takeEvery } from 'redux-saga/effects'
import { getFoodloverOrdersReq, getFoodloverOrderInfoReq } from 'api/requests/Foodlover'

import {
  GET_FOODLOVER_ORDERS_REQUESTING,
  GET_FOODLOVER_ORDERS_SUCCESS,
  GET_FOODLOVER_ORDERS_ERROR,
  GET_FL_ORDER_REQUESTING,
  GET_FL_ORDER_SUCCESS,
  GET_FL_ORDER_ERROR,
} from '../actions/constants'

function* getFoodloverOrdersSaga() {
  try {
    const response = yield getFoodloverOrdersReq({ startD: '2021-01-01', endD: '2021-12-31' })
    const data = response.data.map(({ totalItems, clientName, ...rest }) => ({
      totalItems: rest.orderProducts.reduce((a, b) => a + (b.quantity || 0), 0),
      clientName: rest.customer.profileName,
      ...rest,
    }))
    yield put({ type: GET_FOODLOVER_ORDERS_SUCCESS, data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FOODLOVER_ORDERS_ERROR, error: error.response.data.error })
    }
  }
}

function* getFoodloverOrderSaga({ payload }) {
  try {
    const response = yield getFoodloverOrderInfoReq(payload)
    yield put({ type: GET_FL_ORDER_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FL_ORDER_ERROR, error: error.response.data.error })
    }
  }
}

function* foodloverOrdersWatcher() {
  yield takeEvery(GET_FOODLOVER_ORDERS_REQUESTING, getFoodloverOrdersSaga)
  yield takeEvery(GET_FL_ORDER_REQUESTING, getFoodloverOrderSaga)
}

export default foodloverOrdersWatcher
