/* eslint-disable import/prefer-default-export */
import { STRIPE_CHECKOUT_REQUESTING } from './constants'

export const stripeCheckoutAC = (item, price) => ({
  type: STRIPE_CHECKOUT_REQUESTING,
  item,
  price,
})
