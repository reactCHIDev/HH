import React from 'react'
import { useSelector } from 'react-redux'
import Heading from './components/Heading'
import Content from './components/Content'
import Settings from './components/Settings'

import styles from './cart.module.scss'

function CartPage() {
  const orders = useSelector((state) => state.cart.orders)
  const shops = useSelector((state) => state.cart.shops)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Heading />
        <Content orders={orders} shops={shops} />
        <Settings />
      </div>
    </div>
  )
}

export default CartPage
