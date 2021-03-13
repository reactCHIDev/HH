/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-console */
import { put, takeEvery, call } from 'redux-saga/effects'
import { getItem } from 'utils/localStorage'
import { createOrder } from 'api/requests/Order'

import {
  CREATE_ORDER_REQUESTING,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
} from '../actions/constants'

function* createOrderRequest({ data }) {
  const userId = getItem('user-id')
  const sessionId = getItem('sessionId')
  const { orders, shopsData } = getItem('cart')
  const { adress, firstName, lastName, phone, company } = data

  try {
    for (const key in orders) {
      yield call(createOrder, createParam(key))
    }

    function createParam(shop) {
      const orderProducts = orders[shop].map(({ id, parameters, total }) => ({
        productId: id,
        price: parameters[0].price,
        currency: parameters[0].currency,
        quantity: total,
        productVolume: parameters[0].volume,
        productMeasure: parameters[0].measure,
        total: total * parameters[0].price,
      }))
      const params = {
        orderProducts,
        customerId: userId,
        firstName,
        lastName,
        deliveryMethod: shopsData[shop].delivery.type,
        deliveryAddress: adress,
        phone,
        company: company || null,
        deliveryPrice: shopsData[shop].delivery.price,
        orderTotal: shopsData[shop].price + shopsData[shop].delivery.price,
        sessionId,
        paymentDetails: {
          products: JSON.stringify(orderProducts),
        },
      }
      return params
    }

    yield put({ type: CREATE_ORDER_SUCCESS })
  } catch (error) {
    if (error.response) {
      yield put({ type: CREATE_ORDER_ERROR, error: error.response.data.error })
    }
  }
}

function* createOrderWatcher() {
  yield takeEvery(CREATE_ORDER_REQUESTING, createOrderRequest)
}

export default createOrderWatcher
