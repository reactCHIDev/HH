import { CREATE_ORDER_REQUESTING, CREATE_ORDER_SUCCESS, CREATE_ORDER_ERROR } from './constants'

export const createOrderRequestrinAc = () => ({
  type: CREATE_ORDER_REQUESTING,
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
