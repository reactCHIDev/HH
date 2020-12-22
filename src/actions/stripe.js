import {
  GET_STRIPE_TOKEN_REQUESTING,
  GET_STRIPE_TOKEN_SUCCESS,
  GET_STRIPE_TOKEN_ERROR,
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
