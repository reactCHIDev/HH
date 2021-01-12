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
} from '../actions/constants'

function* basketFlow({ data }) {
  const { title, shop, price, amount } = data
  const getOrdersData = (store) => store.cart
  const { products, orders, shopsData } = yield select(getOrdersData)

  if (products.includes(title)) {
    const { title: shopTitle } = shop
    yield put({ type: DELETE_ITEM_FROM_PRODUCTS, data: { title, shopTitle } })
    return
  }

  yield put({ type: SET_ITEM_TO_PRODUCTS, title })

  if (!(shop.title in shopsData)) {
    try {
      const {
        data: { deliveryMethods, title: shopTitle },
      } = yield getShopByUrlReq(shop.shopUrl)
      const newPrice = price * (amount || 1)

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
        title,
      })
      return
    }
  } else {
    yield put({ type: ADD_ITEM_TO_ORDER, data: { shop: shop.title, price } })
  }

  if (shop.title in orders) {
    try {
      const newState = cloneDeep(orders)
      newState[shop.title].push({
        ...data,
        ...{ total: amount || 1, totalPrice: (amount || 1) * price },
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
      newState[shop.title] = [
        { ...data, ...{ total: amount || 1 }, totalPrice: (amount || 1) * price },
      ]
      yield put({ type: SET_ITEM_IN_ORDERS, newState })
    } catch {
      console.log('error in saga when add new product to new shop')
      const { title: shopTitle } = shop
      yield put({ type: DELETE_PRODUCT_AND_SHOP_FROM_LIST, data: { title, shopTitle, price } })
    }
  }
}

function* cartWatcher() {
  yield takeLatest(ADD_PRODUCT_TO_BASKET, basketFlow)
}

export default cartWatcher
