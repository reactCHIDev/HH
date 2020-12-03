import { UPDATE_SHOP_REQUESTING, UPDATE_SHOP_SUCCESS, UPDATE_SHOP_ERROR } from './constants'

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
