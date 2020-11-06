import {
  GET_PRODUCT_TYPES_REQUESTING,
  GET_PRODUCT_TYPES_SUCCESS,
  GET_PRODUCT_TYPES_ERROR,
} from './constants'

export const getProductTypes = () => ({
  type: GET_PRODUCT_TYPES_REQUESTING,
})

export const getProductTypesSuccess = () => ({
  type: GET_PRODUCT_TYPES_SUCCESS,
})

export const getProductTypesError = (error) => ({
  type: GET_PRODUCT_TYPES_ERROR,
  error,
})
