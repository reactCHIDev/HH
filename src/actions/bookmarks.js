import {
  GET_FAV_PRODUCTS,
  GET_FAV_EXPERIENCES,
  GET_FAV_FOODMAKERS,
  GET_FAV_SHOPS,
} from './constants'

export const getFavExperiencesAC = (startIdx, lim) => ({
  type: GET_FAV_EXPERIENCES,
  payload: { startIdx, lim },
})

export const getFavProductsAC = (startIdx, lim) => ({
  type: GET_FAV_PRODUCTS,
  payload: { startIdx, lim },
})

export const getFavMakersAC = (startIdx, lim) => ({
  type: GET_FAV_FOODMAKERS,
  payload: { startIdx, lim },
})

export const getFavShopsAC = (startIdx, lim) => ({
  type: GET_FAV_SHOPS,
  payload: { startIdx, lim },
})
