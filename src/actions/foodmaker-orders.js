import {
  GET_FOODMAKER_ORDERS_REQUESTING,
  GET_FOODMAKER_ORDERS_SUCCESS,
  GET_FOODMAKER_ORDERS_ERROR,
  GET_FM_ORDER_REQUESTING,
  GET_FM_ORDER_SUCCESS,
  GET_FM_ORDER_ERROR,
  REMOVE_FM_ORDER,
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

export const getFMOrderAC = (id) => ({
  type: GET_FM_ORDER_REQUESTING,
  payload: id,
})

export const removeFMOrder = () => ({
  type: REMOVE_FM_ORDER,
})
