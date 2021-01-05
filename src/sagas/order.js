/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-console */
import { put, takeEvery, select, call } from 'redux-saga/effects'
import { createOrder, createCharge } from 'api/requests/Order'
import { getStripe } from 'api/requests/Stripe'

import {
  CREATE_ORDER_REQUESTING,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
} from '../actions/constants'

const card = {
  number: '4000003440000004',
  exp_month: 12,
  exp_year: 2021,
  cvc: '314',
}

const superCard = {
  number: '4000003440000004',
  brand: 'Visa',
  country: 'HK',
}

function* createOrderReqeust() {
  const getOrdersData = (store) => store.cart
  const getAccountData = (store) => store.account

  const { orders, totalPrice, shopsData } = yield select(getOrdersData)
  const { id: userId } = yield select(getAccountData)

  try {
    const token = yield getStripe({ card })
    const charge = yield createCharge({
      amount: totalPrice,
      cardToken: token.data.id,
      card: superCard,
      metadata: Object.keys(orders)
        .flatMap((val) => orders[val])
        .map(({ id, parameters, total }) => ({
          productId: id,
          price: parameters[0].price,
          currency: parameters[0].currency,
          quantity: total,
          productVolume: parameters[0].volume,
          productMeasure: parameters[0].measure,
          total: total * parameters[0].price,
        })),
    })

    for (const key in orders) {
      yield call(createOrder, createParam(key))
    }

    function createParam(shop) {
      const params = {
        orderProducts: orders[shop].map(({ id, parameters, total }) => ({
          productId: id,
          price: parameters[0].price,
          currency: parameters[0].currency,
          quantity: total,
          productVolume: parameters[0].volume,
          productMeasure: parameters[0].measure,
          total: total * parameters[0].price,
        })),
        customerId: userId,
        firstName: 'Lol',
        lastName: 'Mda',
        deliveryMethod: 'Free',
        deliveryAddress: 'Some address',
        phone: '123 12345678',
        deliveryPrice: shopsData[shop].delivery.price,
        orderTotal: shopsData[shop].price + shopsData[shop].delivery.price,
        paymentDetails: charge.data.receiptData,
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
  yield takeEvery(CREATE_ORDER_REQUESTING, createOrderReqeust)
}

export default createOrderWatcher
