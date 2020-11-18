import { put, takeEvery } from 'redux-saga/effects'
import PATHS from 'api/paths'

import { getFoodmakerInfoReq } from 'api/requests/foodmaker'

import {
  GET_FOODMAKER_INFO_REQUESTING,
  GET_FOODMAKER_INFO_SUCCESS,
  GET_FOODMAKER_INFO_ERROR,
} from '../actions/constants'

function* getFoodmakerInfoSaga({ id }) {
  try {
    const response = yield getFoodmakerInfoReq(id)
    yield put({ type: GET_FOODMAKER_INFO_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FOODMAKER_INFO_ERROR, error: error.response.data.error })
    }
  }
}

function* accountWatcher() {
  yield takeEvery(GET_FOODMAKER_INFO_REQUESTING, getFoodmakerInfoSaga)
}

export default accountWatcher
