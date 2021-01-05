import { CREATE_ORDER_REQUESTING, CREATE_ORDER_SUCCESS, CREATE_ORDER_ERROR } from './constants'

export const createOrderRequestrinAc = (data) => ({
  type: CREATE_ORDER_REQUESTING,
  data,
})

export const createOrderSuccess = (data) => {
  return {
    type: CREATE_ORDER_SUCCESS,
    data,
  }
}

export const createOrderError = (error) => ({
  type: CREATE_ORDER_ERROR,
  error,
})
