import { put, takeEvery } from 'redux-saga/effects'
import { getBillingHistory } from 'api/requests/Account'

import {
  GET_BILLING_HISTORY_REQUESTING,
  GET_BILLING_HISTORY_SUCCESS,
  GET_BILLING_HISTORY_ERROR,
} from '../actions/constants'

function* getBillingHistorySaga() {
  try {
    const response = yield getBillingHistory()
    yield put({ type: GET_BILLING_HISTORY_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_BILLING_HISTORY_ERROR, error: error.response.data.error })
    }
  }
}

function* billingHistoryrdersWatcher() {
  yield takeEvery(GET_BILLING_HISTORY_REQUESTING, getBillingHistorySaga)
}

export default billingHistoryrdersWatcher
