import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Heading from './components/Heading'
import Content from './components/Content'
import Settings from './components/Settings'
import Tint from 'components/Tint'
import Error from 'components/Error'

import styles from './cart.module.scss'

function CartPage() {
  const orders = useSelector((state) => state.cart.orders)
  const shops = useSelector((state) => state.cart.shopsData)
  const totalPrice = useSelector((state) => state.cart.totalPrice)
  const requesting = useSelector((state) => state.order.requesting)
  const error = useSelector((state) => state.order.error)
  const dispatch = useDispatch()

  const modalClose = () => {
    dispatch({ type: 'RESET_CREATE_ORDER_ERROR' })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Heading />
        <Content orders={orders} shops={shops} />
        <Settings price={totalPrice} active={!!Object.keys(orders).length} />
      </div>
      {requesting && <Tint />}
      {error && <Error close={modalClose} />}
    </div>
  )
}

export default CartPage
