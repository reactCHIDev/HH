import {
  ADD_PRODUCT_TO_BASKET,
  SET_ITEM_TO_PRODUCTS,
  DELETE_ITEM_FROM_PRODUCTS,
  SET_ITEM_IN_ORDERS,
  SET_SHOP_DATA,
  INC_PRODUCT_AMOUNT,
  DEC_PRODUCT_AMOUNT,
  CHANGE_DELIVERY_TYPE,
  ADD_ITEM_TO_ORDER,
  DELETE_PRODUCT_AND_SHOP_FROM_LIST,
  DELETE_PRODUCT_FROM_LIST,
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

export const setItemInOrder = (data) => {
  return {
    type: SET_ITEM_IN_ORDERS,
    data,
  }
}
export const setShopData = (data) => {
  return {
    type: SET_SHOP_DATA,
    data,
  }
}

export const incProductAmount = (data) => {
  return {
    type: INC_PRODUCT_AMOUNT,
    data,
  }
}

export const decProductAmount = (data) => {
  return {
    type: DEC_PRODUCT_AMOUNT,
    data,
  }
}

export const changeDeliveryType = (data) => {
  return {
    type: CHANGE_DELIVERY_TYPE,
    data,
  }
}

export const addItemToProduct = (data) => {
  return {
    type: ADD_ITEM_TO_ORDER,
    data,
  }
}

export const deleteProductFromList = (data) => {
  return {
    type: DELETE_PRODUCT_FROM_LIST,
    data,
  }
}

export const deleteProductAndShopFromList = (data) => {
  return {
    type: DELETE_PRODUCT_AND_SHOP_FROM_LIST,
    data,
  }
}
