/* eslint-disable no-param-reassign */
import { put, takeLatest, select } from 'redux-saga/effects'
import cloneDeep from 'lodash/cloneDeep'

import { getShopByUrlReq } from 'api/requests/Shop'

import {
  ADD_PRODUCT_TO_BASKET,
  SET_ITEM_TO_PRODUCTS,
  DELETE_ITEM_FROM_PRODUCTS,
  SET_ITEM_IN_ORDERS,
  SET_SHOP_DATA,
  ADD_ITEM_TO_ORDER,
  DELETE_PRODUCT_FROM_LIST,
  DELETE_PRODUCT_AND_SHOP_FROM_LIST,
  INC_PRODUCT_AMOUNT,
  DEC_PRODUCT_AMOUNT,
  UPDATE_CART,
} from '../actions/constants'

function* basketFlow({ data }) {
  const { title, shop, price, amount, id } = data
  const isDiscount = amount + 1 > data.discount.quantity

  const getOrdersData = (store) => store.cart
  const { products, orders, shopsData } = yield select(getOrdersData)

  if (products.includes(id)) {
    const { title: shopTitle } = shop
    yield put({ type: DELETE_ITEM_FROM_PRODUCTS, data: { id, title, shopTitle, price } })
    return
  }

  yield put({ type: SET_ITEM_TO_PRODUCTS, id })

  if (!(shop.title in shopsData)) {
    try {
      const {
        data: { deliveryMethods, title: shopTitle },
      } = yield getShopByUrlReq(shop.shopUrl)
      const newPrice = isDiscount
        ? price * (amount || 1) * (1 - data.discount.discount / 100)
        : price * (amount || 1)

      const methods = deliveryMethods.map(({ freeDeliveryOver, note, price: delPrice, type }) => ({
        freeDeliveryOver: freeDeliveryOver || 0,
        note: note || '',
        delPrice: delPrice || 0,
        type: type || '',
      }))

      const delivery = {
        type: methods[0].type,
        price: methods[0].delPrice,
      }
      yield put({
        type: SET_SHOP_DATA,
        data: { deliveryMethods: methods, price: newPrice, shopTitle, delivery },
      })
    } catch {
      console.log('error in saga when add new shop to shops list')
      yield put({
        type: DELETE_PRODUCT_FROM_LIST,
        id,
      })
      return
    }
  } else {
    yield put({ type: ADD_ITEM_TO_ORDER, data: { shop: shop.title, price: 20 } })
  }

  if (shop.title in orders) {
    try {
      const newState = cloneDeep(orders)
      newState[shop.title].push({
        ...data,
        ...{
          total: amount || 1,
          totalPrice: isDiscount
            ? (amount || 1) * price * (1 - data.discount.discount / 100)
            : (amount || 1) * price,
        },
      })
      yield put({ type: SET_ITEM_IN_ORDERS, newState })
    } catch {
      console.log('error in saga when add new product to exact shop')
      yield put({
        type: DELETE_PRODUCT_FROM_LIST,
        title,
      })
    }
  } else {
    try {
      const newState = cloneDeep(orders)
      data.prevPrice = price
      data.price = isDiscount ? price * (1 - data.discount.discount / 100) : price
      newState[shop.title] = [
        {
          ...data,
          ...{ total: amount || 1 },
          totalPrice: isDiscount
            ? (amount || 1) * price * (1 - data.discount.discount / 100)
            : (amount || 1) * price,
        },
      ]
      yield put({ type: SET_ITEM_IN_ORDERS, newState })
    } catch {
      console.log('error in saga when add new product to new shop')
      const { title: shopTitle } = shop
      yield put({ type: DELETE_PRODUCT_AND_SHOP_FROM_LIST, data: { title, shopTitle, price } })
    }
  }
}

function* incProductFlow({ data }) {
  const { shop, id, addDiscount } = data
  const getOrdersData = (store) => store.cart
  const state = yield select(getOrdersData)
  let newState = cloneDeep(state)

  if (addDiscount) {
    newState = {
      ...newState,
      orders: {
        ...newState.orders,
        [shop]: newState.orders[shop].map((item) =>
          item.id === id
            ? {
                ...item,
                total: item.total + 1,
                price: item.price * (1 - item.discount.discount / 100),
                prevPrice: item.price,
                totalPrice: (item.total + 1) * item.price * (1 - item.discount.discount / 100),
              }
            : item,
        ),
      },
    }
  } else {
    newState = {
      ...newState,
      orders: {
        ...newState.orders,
        [shop]: newState.orders[shop].map((item) =>
          item.id === id
            ? { ...item, total: item.total + 1, totalPrice: (item.total + 1) * item.price }
            : item,
        ),
      },
    }
  }

  yield put({ type: UPDATE_CART, data: { newState, shop } })
}

function* decProductFlow({ data }) {
  const { shop, id, removeDiscount } = data
  const getOrdersData = (store) => store.cart
  const state = yield select(getOrdersData)
  let newState = cloneDeep(state)

  if (removeDiscount) {
    newState = {
      ...newState,
      orders: {
        ...newState.orders,
        [shop]: newState.orders[shop].map((item) =>
          item.id === id
            ? {
                ...item,
                total: item.total - 1,
                price: item.prevPrice,
                totalPrice: (item.total - 1) * item.prevPrice,
              }
            : item,
        ),
      },
    }
  } else {
    newState = {
      ...newState,
      orders: {
        ...newState.orders,
        [shop]: newState.orders[shop].map((item) =>
          item.id === id
            ? { ...item, total: item.total - 1, totalPrice: (item.total - 1) * item.price }
            : item,
        ),
      },
    }
  }

  yield put({ type: UPDATE_CART, data: { newState, shop } })
}

function* cartWatcher() {
  yield takeLatest(ADD_PRODUCT_TO_BASKET, basketFlow)
  yield takeLatest(INC_PRODUCT_AMOUNT, incProductFlow)
  yield takeLatest(DEC_PRODUCT_AMOUNT, decProductFlow)
}

export default cartWatcher
