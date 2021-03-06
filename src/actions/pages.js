import {
  GET_PUBLIC_PRODUCTS,
  GET_PUBLIC_EXPERIENCES,
  GET_PUBLIC_FOODMAKERS,
  RESOLVE_FOODMAKER_DATA,
} from './constants'

export const getPublicProductsAC = (startIdx, lim, city) => ({
  type: GET_PUBLIC_PRODUCTS,
  payload: { startIdx, lim, city },
})

export const getPublicExperiencesAC = (startIdx, lim, city) => ({
  type: GET_PUBLIC_EXPERIENCES,
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
