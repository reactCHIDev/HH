import {
  ADD_PRODUCT_TO_BASKET,
  SET_ITEM_TO_PRODUCTS,
  DELETE_ITEM_FROM_PRODUCTS,
  SET_SHOP_TO_SHOPS,
  SET_ITEM_IN_ORDERS,
} from './constants'

export const addProductToBasket = (data) => {
  return {
    type: ADD_PRODUCT_TO_BASKET,
    data,
  }
}

export const setItemToProducts = (data) => {
  return {
    type: SET_ITEM_TO_PRODUCTS,
    data,
  }
}

export const deleteItemFromProducts = (data) => {
  return {
    type: DELETE_ITEM_FROM_PRODUCTS,
    data,
  }
}

export const setShopToShops = (data) => {
  return {
    type: SET_SHOP_TO_SHOPS,
    data,
  }
}

export const setItemInOrder = (data) => {
  return {
    type: SET_ITEM_IN_ORDERS,
    data,
  }
}
