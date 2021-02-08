import { put, takeEvery, select } from 'redux-saga/effects'
import {
  getUsersListReq,
  getShopsListReq,
  getWithdrawListReq,
  approveWithdrawReq,
} from 'api/requests/Admin'

import {
  GET_USERS_LIST_REQUESTING,
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_ERROR,
  GET_SHOPS_LIST_REQUESTING,
  GET_SHOPS_LIST_SUCCESS,
  GET_SHOPS_LIST_ERROR,
  GET_WITHDRAW_LIST_REQUESTING,
  GET_WITHDRAW_LIST_SUCCESS,
  GET_WITHDRAW_LIST_ERROR,
  APPROVE_WITHDRAW_REQUESTING,
  APPROVE_WITHDRAW_SUCCESS,
  APPROVE_WITHDRAW_ERROR,
} from '../actions/constants'

function* getUsersListSaga() {
  try {
    const response = yield getUsersListReq()
    yield put({ type: GET_USERS_LIST_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_USERS_LIST_ERROR, error: error.response.data.error })
    }
  }
}

function* getShopsListSaga() {
  try {
    const response = yield getShopsListReq()
    yield put({ type: GET_SHOPS_LIST_SUCCESS, data: response.data })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_SHOPS_LIST_ERROR, error: error.response.data.error })
    }
  }
}

function* getWithdrawListSaga({ payload }) {
  try {
    const response = yield getWithdrawListReq(payload)
    const data = response.data.map(
      ({
        userEmail,
        userProfileName,
        balanceAccountNumber,
        balanceBankCode,
        balanceBankName,
        balancePaymentPhone,
        ...rest
      }) => ({
        userEmail: rest.userProfile.user.email,
        userProfileName: rest.userProfile.user.profileName,
        balanceAccountNumber: rest.userProfile.balance.accountNumber,
        balanceBankCode: rest.userProfile.balance.bankCode,
        balanceBankName: rest.userProfile.balance.bankName,
        balancePaymentPhone: rest.userProfile.balance.paymentPhone,
        ...rest,
      }),
    )
    yield put({ type: GET_WITHDRAW_LIST_SUCCESS, data, params: payload })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_WITHDRAW_LIST_ERROR, error: error.response.data.error })
    }
  }
}

function* approveWithdrawSaga({ payload }) {
  try {
    yield approveWithdrawReq({ withdrawRequestId: payload })
    const {
      admin: { params },
    } = yield select()
    console.log('%c   params   ', 'color: darkgreen; background: palegreen;', params)
    yield put({ type: GET_WITHDRAW_LIST_REQUESTING, payload: params })
  } catch (error) {
    if (error.response) {
      yield put({ type: APPROVE_WITHDRAW_ERROR, error: error.response.data.error })
    }
  }
}

function* adminWatcher() {
  yield takeEvery(GET_USERS_LIST_REQUESTING, getUsersListSaga)
  yield takeEvery(GET_SHOPS_LIST_REQUESTING, getShopsListSaga)
  yield takeEvery(GET_WITHDRAW_LIST_REQUESTING, getWithdrawListSaga)
  yield takeEvery(APPROVE_WITHDRAW_REQUESTING, approveWithdrawSaga)
}

export default adminWatcher
