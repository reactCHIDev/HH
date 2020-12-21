import React from 'react'
import T from 'prop-types'
import styles from './ordersfl.module.scss'
import './ordersfl.less'

const OrdersFL = (props) => {
  const { x } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>ORDERS FOODLOVERA</div>
    </div>
  )
}

OrdersFL.propTypes = {}

export default OrdersFL
