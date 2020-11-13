import {
  CREATE_PRODUCT_REQUESTING,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
} from './constants'

export const createProductRequest = (payload) => ({
  type: CREATE_PRODUCT_REQUESTING,
  payload,
})

export const createProductSuccess = () => ({
  type: CREATE_PRODUCT_SUCCESS,
})

export const createProductError = (error) => ({
  type: CREATE_PRODUCT_ERROR,
  error,
})
