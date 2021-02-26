import {
  GET_STRIPE_TOKEN_REQUESTING,
  GET_STRIPE_TOKEN_SUCCESS,
  GET_STRIPE_TOKEN_ERROR,
  STRIPE_CHECKOUT_REQUESTING,
} from './constants'

export const getStripeTokenAC = () => ({
  type: GET_STRIPE_TOKEN_REQUESTING,
})

export const getStripeTokenSuccess = (token) => {
  return {
    type: GET_STRIPE_TOKEN_SUCCESS,
    token,
  }
}

export const getStripeTokenError = (error) => ({
  type: GET_STRIPE_TOKEN_ERROR,
  error,
})

export const stripeCheckoutAC = (item, price) => ({
  type: STRIPE_CHECKOUT_REQUESTING,
  item,
  price,
})
