import { put, takeEvery, delay, takeLatest } from 'redux-saga/effects'
import PATHS from 'api/paths'

import {
  getFoodmakerInfoReq,
  getFoodmakerInfoByNameReq,
  updateFoodmakerAccountReq,
  createWithdrawReq,
  updateBankDataReq,
} from 'api/requests/foodmaker'

import {
  GET_FOODMAKER_INFO_REQUESTING,
  GET_FOODMAKER_INFO_SUCCESS,
  GET_FOODMAKER_INFO_ERROR,
  GET_FOODMAKER_INFO_BY_NAME_REQUESTING,
  GET_FOODMAKER_INFO_BY_NAME_SUCCESS,
  GET_FOODMAKER_INFO_BY_NAME_ERROR,
  UPDATE_FOODMAKER_ACCOUNT_REQUESTING,
  UPDATE_FOODMAKER_ACCOUNT_SUCCESS,
  UPDATE_FOODMAKER_ACCOUNT_ERROR,
  CREATE_WITHDRAW_REQUESTING,
  CREATE_WITHDRAW_SUCCESS,
  CREATE_WITHDRAW_ERROR,
  UPDATE_BANK_DATA_REQUESTING,
  UPDATE_BANK_DATA_SUCCESS,
  UPDATE_BANK_DATA_ERROR,
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

function* getFoodmakerInfoByNameSaga({ name }) {
  try {
    const response = yield getFoodmakerInfoByNameReq(name)
    yield put({ type: GET_FOODMAKER_INFO_BY_NAME_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_FOODMAKER_INFO_BY_NAME_ERROR, error: error.response.data.error })
    }
  }
}

function* changeFoodmakerAccount({ payload }) {
  try {
    const response = yield updateFoodmakerAccountReq(payload)
    yield put({ type: UPDATE_FOODMAKER_ACCOUNT_SUCCESS, payload: { data: response.data } })
    yield delay(3000)
    yield put({ type: 'RESET_ACCOUNT_SUCCESS' })
  } catch (error) {
    if (error.response) {
      yield put({ type: UPDATE_FOODMAKER_ACCOUNT_ERROR, error: error.response.data.error })
    }
  }
}

function* createWithdrawSaga({ payload }) {
  try {
    const response = yield createWithdrawReq(payload)
    yield put({ type: CREATE_WITHDRAW_SUCCESS, payload: { data: response.data } })
    yield delay(3000)
    yield put({ type: 'RESET_ACCOUNT_SUCCESS' })
  } catch (error) {
    if (error.response) {
      yield put({ type: CREATE_WITHDRAW_ERROR, error: error.response.data.error })
    }
  }
}

function* updateBankDataSaga({ payload }) {
  try {
    yield updateBankDataReq(payload)
    yield put({ type: UPDATE_BANK_DATA_SUCCESS })
  } catch (error) {
    if (error.response) {
      yield put({ type: UPDATE_BANK_DATA_ERROR, error: error.response.data.error })
    }
  }
}

function* accountWatcher() {
  yield takeEvery(GET_FOODMAKER_INFO_REQUESTING, getFoodmakerInfoSaga)
  yield takeEvery(GET_FOODMAKER_INFO_BY_NAME_REQUESTING, getFoodmakerInfoByNameSaga)
  yield takeEvery(UPDATE_FOODMAKER_ACCOUNT_REQUESTING, changeFoodmakerAccount)
  yield takeEvery(CREATE_WITHDRAW_REQUESTING, createWithdrawSaga)
  yield takeEvery(UPDATE_BANK_DATA_REQUESTING, updateBankDataSaga)
}

export default accountWatcher
