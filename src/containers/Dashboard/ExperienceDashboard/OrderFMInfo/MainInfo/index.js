import React from 'react'
import T from 'prop-types'
import { useSelector } from 'react-redux'

import styles from './maininfo.module.scss'
import OrderInfo from './OrderInfo'
import Chat from './Chat'

const MainOrderInfo = (props) => {
  const { orderHash } = props
  const order = useSelector((state) => state.fmOrders.orders).find((e) => e.id === orderHash)

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <OrderInfo order={order} />
        <Chat />
      </div>
    </div>
  )
}

MainOrderInfo.propTypes = {
  orderHash: T.string,
}

export default MainOrderInfo
