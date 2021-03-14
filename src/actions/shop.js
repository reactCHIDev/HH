import {
  UPDATE_SHOP_REQUESTING,
  UPDATE_SHOP_SUCCESS,
  UPDATE_SHOP_ERROR,
  CREATE_SHOP_REQUESTING,
  GET_SHOP_BY_FM_ID_REQUESTING,
  GET_SHOP_BY_URL_REQUESTING,
} from './constants'

export const updateShopAC = (data) => ({
  type: UPDATE_SHOP_REQUESTING,
  payload: data,
})

export const updateShopSuccessAC = (payload) => ({
  type: UPDATE_SHOP_SUCCESS,
  payload,
})

export const updateShopErrorAC = (payload) => ({
  type: UPDATE_SHOP_ERROR,
  payload,
})

export const getShopByFoodmakerIdAC = (data) => ({
  type: GET_SHOP_BY_FM_ID_REQUESTING,
  payload: data,
})

export const getShopByUrlAC = (url) => ({
  type: GET_SHOP_BY_URL_REQUESTING,
  url,
})

export const createShopAC = (data) => ({
  type: CREATE_SHOP_REQUESTING,
  payload: data,
})
