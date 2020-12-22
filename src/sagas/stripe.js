import { put, takeEvery } from 'redux-saga/effects'
// import PATHS from 'api/paths'
// import Stripe from 'stripe'
import { getStripe } from 'api/requests/Stripe'

import {
  GET_STRIPE_TOKEN_REQUESTING,
  GET_STRIPE_TOKEN_SUCCESS,
  GET_STRIPE_TOKEN_ERROR,
} from '../actions/constants'

const card = {
  number: '4000003440000004',
  exp_month: 12,
  exp_year: 2021,
  cvc: '314',
}

/* const stripe = new Stripe(process.env.REACT_APP_STRIPE_API_KEY, {
  apiVersion: '2020-08-27',
})
 
const getPaymentToken = async () => {
  try {
    const token = await stripe.tokens.create({ card })
    return token
  } catch (error) {
    console.log('%c   error   ', 'color: white; background: salmon;', error)
  } 
} */

function* getStripeToken() {
  try {
    const token = yield getStripe({ card })
    yield put({ type: GET_STRIPE_TOKEN_SUCCESS, token: token.data.id })
  } catch (error) {
    if (error.response) {
      yield put({ type: GET_STRIPE_TOKEN_ERROR, error: error.response.data.error })
    }
  }
}

function* stripeWatcher() {
  yield takeEvery(GET_STRIPE_TOKEN_REQUESTING, getStripeToken)
}

export default stripeWatcher
