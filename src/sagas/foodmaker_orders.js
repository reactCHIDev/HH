import { put, takeEvery } from 'redux-saga/effects'
import { getFoodmakerOrdersReq } from 'api/requests/foodmaker'

import {
  GET_FOODMAKER_ORDERS_REQUESTING,
  GET_FOODMAKER_ORDERS_SUCCESS,
  GET_FOODMAKER_ORDERS_ERROR,
} from '../actions/constants'

function* getFoodmakerOrdersSaga() {
  console.log('%c   saga   ', 'color: white; background: salmon;')
  try {
    const response = yield getFoodmakerOrdersReq({ startD: '2021-01-01', endD: '2021-12-31' })
    yield put({ type: GET_FOODMAKER_ORDERS_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FOODMAKER_ORDERS_ERROR, error: error.response.data.error })
    }
  }
}

function* foodmakerOrdersWatcher() {
  yield takeEvery(GET_FOODMAKER_ORDERS_REQUESTING, getFoodmakerOrdersSaga)
}

export default foodmakerOrdersWatcher
