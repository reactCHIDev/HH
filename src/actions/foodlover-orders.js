import {
  GET_FOODLOVER_ORDERS_REQUESTING,
  GET_FOODLOVER_ORDERS_SUCCESS,
  GET_FOODLOVER_ORDERS_ERROR,
  GET_FL_ORDER_REQUESTING,
  GET_FL_ORDER_SUCCESS,
  GET_FL_ORDER_ERROR,
  REMOVE_FL_ORDER,
} from './constants'

export const getFoodloverOrdersAC = () => ({
  type: GET_FOODLOVER_ORDERS_REQUESTING,
})

export const getFoodloverOrdersSuccess = () => ({
  type: GET_FOODLOVER_ORDERS_SUCCESS,
})

export const getFoodloverOrdersError = (payload) => ({
  type: GET_FOODLOVER_ORDERS_ERROR,
  payload,
})

export const getFLOrderAC = (id) => ({
  type: GET_FL_ORDER_REQUESTING,
  payload: id,
})

export const removeFLOrder = () => ({
  type: REMOVE_FL_ORDER,
})
