import {
  GET_FOODMAKER_ORDERS_REQUESTING,
  GET_FOODMAKER_ORDERS_SUCCESS,
  GET_FOODMAKER_ORDERS_ERROR,
  GET_FM_ORDER_REQUESTING,
  REMOVE_FM_ORDER,
  CHANGE_DELIVERY_STATUS,
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

export const changeDeliveryStatusAc = (data) => ({
  type: CHANGE_DELIVERY_STATUS,
  data,
})
