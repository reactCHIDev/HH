import { put, takeLatest, select } from 'redux-saga/effects'

import {
  ADD_PRODUCT_TO_BASKET,
  SET_ITEM_TO_PRODUCTS,
  DELETE_ITEM_FROM_PRODUCTS,
  SET_SHOP_TO_SHOPS,
  SET_ITEM_IN_ORDERS,
} from '../actions/constants'

function* basketFlow({ data }) {
  const { title, shop } = data
  const getOrdersData = (store) => store.cart
  const { products, orders, shops } = yield select(getOrdersData)

  if (products.includes(title)) {
    yield put({ type: DELETE_ITEM_FROM_PRODUCTS, data })
    return
  }

  yield put({ type: SET_ITEM_TO_PRODUCTS, title })

  if (!shops.includes(shop.title)) {
    yield put({ type: SET_SHOP_TO_SHOPS, shop })
  }

  if (shop.title in orders) {
    const newState = { ...orders }
    newState[shop.title].push(data)
    yield put({ type: SET_ITEM_IN_ORDERS, newState })
  } else {
    const newState = { ...orders }
    newState[shop.title] = [data]
    yield put({ type: SET_ITEM_IN_ORDERS, newState })
  }
}

function* loginWatcher() {
  yield takeLatest(ADD_PRODUCT_TO_BASKET, basketFlow)
}

export default loginWatcher
