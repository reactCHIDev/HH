import {
  UPDATE_SHOP_REQUESTING,
  UPDATE_SHOP_SUCCESS,
  UPDATE_SHOP_ERROR,
  GET_SHOP_BY_FM_ID_REQUESTING,
  GET_SHOP_BY_FM_ID_SUCCESS,
  GET_SHOP_BY_FM_ID_ERROR,
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
