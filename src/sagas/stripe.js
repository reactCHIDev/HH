import { put, takeEvery } from 'redux-saga/effects'
import { getItem, setItem } from 'utils/localStorage'
import { loadStripe } from '@stripe/stripe-js'
import { stripeCheckout } from 'api/requests/Stripe'

import {
  STRIPE_CHECKOUT_REQUESTING,
  STRIPE_CHECKOUT_SUCCESS,
  STRIPE_CHECKOUT_ERROR,
} from '../actions/constants'

// const card = {
//   number: '4000003440000004',
//   exp_month: 12,
//   exp_year: 2021,
//   cvc: '314',
// }

function* stripeCheckoutSaga({ item, price }) {
  let totalPrice
  let successUrl
  let cancelUrl
  if (item === 'cart') {
    ;({ totalPrice } = getItem('cart'))
    successUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/payment-success'
        : `${process.env.REACT_APP_BASE_URL}/payment-success`
    cancelUrl = `${process.env.REACT_APP_BASE_URL}/payment-error`
  }
  if (item === 'booking') {
    totalPrice = Number(price)
    successUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/booking-success'
        : `${process.env.REACT_APP_BASE_URL}/booking-success`
    cancelUrl = `${process.env.REACT_APP_BASE_URL}/booking-error`
  }

  try {
    const stripe = yield loadStripe(process.env.REACT_APP_STRIPE_KEY)
    const checkoutData = {
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'hkd',
            product_data: {
              name: 'HungryHugger', // какая то подпись
              images: ['https://hungryhugger.com/favicon.png'],
            },
            unit_amount: Number((totalPrice * 100).toFixed(0)),
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    }

    const response = yield stripeCheckout(checkoutData)
    setItem('sessionId', response.data.id)
    const result = yield stripe.redirectToCheckout({ sessionId: response.data.id })
    yield put({ type: STRIPE_CHECKOUT_SUCCESS, result })
  } catch (error) {
    if (error.response) {
      console.log('%c   error   ', 'color: red; background: white;', error)
      yield put({ type: STRIPE_CHECKOUT_ERROR, error: error })
    }
  }
}

function* stripeWatcher() {
  yield takeEvery(STRIPE_CHECKOUT_REQUESTING, stripeCheckoutSaga)
}

export default stripeWatcher
