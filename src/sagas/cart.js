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
    const {
      data: { deliveryMethods, title: shopTitle },
    } = yield getShopByUrlReq(shop.shopUrl)
    const delivery = {
      type: 'standart',
      price: 20,
    }
    const newPrice = price * (amount || 1)
    yield put({
      type: SET_SHOP_DATA,
      data: { deliveryMethods, price: newPrice, shopTitle, delivery },
    })
  } else {
    yield put({ type: ADD_ITEM_TO_ORDER, data: { shop: shop.title, price } })
  }

  if (shop.title in orders) {
    const newState = cloneDeep(orders)
    newState[shop.title].push({ ...data, ...{ total: amount || 1 } })
    yield put({ type: SET_ITEM_IN_ORDERS, newState })
  } else {
    const newState = cloneDeep(orders)
    newState[shop.title] = [{ ...data, ...{ total: amount || 1 } }]
    yield put({ type: SET_ITEM_IN_ORDERS, newState })
  }
}

function* cartWatcher() {
  yield takeLatest(ADD_PRODUCT_TO_BASKET, basketFlow)
}

export default cartWatcher
