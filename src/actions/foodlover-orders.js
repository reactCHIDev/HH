import {
  GET_FOODLOVER_ORDERS_REQUESTING,
  GET_FOODLOVER_ORDERS_SUCCESS,
  GET_FOODLOVER_ORDERS_ERROR,
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
