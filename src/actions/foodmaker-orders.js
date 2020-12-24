import {
  GET_FOODMAKER_ORDERS_REQUESTING,
  GET_FOODMAKER_ORDERS_SUCCESS,
  GET_FOODMAKER_ORDERS_ERROR,
} from './constants'

export const getFoodmakerOrdersAC = () => ({
  type: GET_FOODMAKER_ORDERS_REQUESTING,
})

export const getFoodmakerOrdersSuccess = () => ({
  type: GET_FOODMAKER_ORDERS_SUCCESS,
})

export const getFoodmakerOrdersError = (payload) => ({
  type: GET_FOODMAKER_ORDERS_ERROR,
  payload,
})
