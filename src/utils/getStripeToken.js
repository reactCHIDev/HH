import React from 'react'
import T from 'prop-types'
import Stripe from 'stripe'
import styles from './qwe.module.scss'
import './qwe.less'

const getStripeToken = async (props) => {
  const stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: '2020-08-27',
  })

  const getToken = async () => {
    const card = {
      number: '4000003440000004',
      exp_month: 12,
      exp_year: 2021,
      cvc: '314',
    }

    const token = await stripe.tokens.create({ card })

    return token
  }

  return getToken()
}

export default getStripeToken
