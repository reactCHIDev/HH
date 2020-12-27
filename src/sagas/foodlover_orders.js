import { put, takeEvery } from 'redux-saga/effects'
import { getFoodloverOrdersReq } from 'api/requests/Foodlover'

import {
  GET_FOODLOVER_ORDERS_REQUESTING,
  GET_FOODLOVER_ORDERS_SUCCESS,
  GET_FOODLOVER_ORDERS_ERROR,
} from '../actions/constants'

function* getFoodloverOrdersSaga() {
  try {
    const response = yield getFoodloverOrdersReq()
    yield put({ type: GET_FOODLOVER_ORDERS_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FOODLOVER_ORDERS_ERROR, error: error.response.data.error })
    }
  }
}

function* foodloverOrdersWatcher() {
  yield takeEvery(GET_FOODLOVER_ORDERS_REQUESTING, getFoodloverOrdersSaga)
}

export default foodloverOrdersWatcher
