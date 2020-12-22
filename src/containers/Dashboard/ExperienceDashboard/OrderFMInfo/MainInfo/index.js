import React from 'react'
import T from 'prop-types'
import styles from './maininfo.module.scss'
import OrderInfo from './OrderInfo'
import Chat from './Chat'

const MainOrderInfo = (props) => {
  const { orderHash } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <OrderInfo />
        <Chat />
      </div>
    </div>
  )
}

MainOrderInfo.propTypes = {
  orderHash: T.string,
}

export default MainOrderInfo
