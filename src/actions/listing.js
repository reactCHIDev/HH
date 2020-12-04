import {
  GET_MY_PRODUCT_LIST_REQUESTING,
  GET_MY_PRODUCT_LIST_SUCCESS,
  GET_MY_PRODUCT_LIST_ERROR,
} from './constants'

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
