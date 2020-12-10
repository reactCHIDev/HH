import {
  GET_PUBLIC_PRODUCTS,
  GET_PUBLIC_PRODUCTS_SUCCESS,
  GET_PUBLIC_PRODUCTS_ERROR,
  GET_PUBLIC_FOODMAKERS,
  GET_PUBLIC_FOODMAKERS_SUCCESS,
  GET_PUBLIC_FOODMAKERS_ERROR,
  RESOLVE_FOODMAKER_DATA,
} from './constants'

export const getPublicProductsAC = (startIdx, lim, city) => ({
  type: GET_PUBLIC_PRODUCTS,
  payload: { startIdx, lim, city },
})

export const getPublicFoodmakersAC = (startIdx, lim, city) => ({
  type: GET_PUBLIC_FOODMAKERS,
  payload: { startIdx, lim, city },
})

export const resolveFoodmakerDataAC = (url) => ({
  type: RESOLVE_FOODMAKER_DATA,
  url,
})
