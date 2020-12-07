import {
  GET_PUBLIC_PRODUCTS,
  GET_PUBLIC_PRODUCTS_SUCCESS,
  GET_PUBLIC_PRODUCTS_ERROR,
} from './constants'

export const getPublicProductsAC = (startIdx, lim, city) => ({
  type: GET_PUBLIC_PRODUCTS,
  payload: { startIdx, lim, city },
})
