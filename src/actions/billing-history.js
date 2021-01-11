import {
  GET_BILLING_HISTORY_REQUESTING,
  GET_BILLING_HISTORY_SUCCESS,
  GET_BILLING_HISTORY_ERROR,
} from './constants'

export const getBillingHistoryAC = () => ({
  type: GET_BILLING_HISTORY_REQUESTING,
})

export const getBillingHistorySuccess = () => ({
  type: GET_BILLING_HISTORY_SUCCESS,
})

export const getBillingHistoryError = (payload) => ({
  type: GET_BILLING_HISTORY_ERROR,
  payload,
})
