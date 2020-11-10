import {
  GET_PRODUCT_TYPES_REQUESTING,
  GET_PRODUCT_TYPES_SUCCESS,
  GET_PRODUCT_TYPES_ERROR,
  GET_MY_PRODUCT_LIST_REQUESTING,
  GET_MY_PRODUCT_LIST_SUCCESS,
  GET_MY_PRODUCT_LIST_ERROR,
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

export const getMyProductList = () => ({
  type: GET_MY_PRODUCT_LIST_REQUESTING,
})

export const getMyProductListSuccess = (data) => {
  return {
    type: GET_MY_PRODUCT_LIST_SUCCESS,
    data,
  }
}

export const getMyProductListError = (error) => ({
  type: GET_MY_PRODUCT_LIST_ERROR,
  error,
})
