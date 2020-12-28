import {
  GET_BILLING_HISTORY_REQUESTING,
  GET_BILLING_HISTORY_SUCCESS,
  GET_BILLING_HISTORY_ERROR,
} from './constants'

export const getFoodmakerOrdersAC = () => ({
  type: GET_BILLING_HISTORY_REQUESTING,
})

export const getFoodmakerOrdersSuccess = () => ({
  type: GET_BILLING_HISTORY_SUCCESS,
})

export const getFoodmakerOrdersError = (payload) => ({
  type: GET_BILLING_HISTORY_ERROR,
  payload,
})
