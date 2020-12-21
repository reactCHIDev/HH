import React from 'react'
import T from 'prop-types'
import styles from './maininfo.module.scss'

const PaymentOrderInfo = (props) => {
  const { orderHash } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>Payment: {orderHash}</div>
    </div>
  )
}

PaymentOrderInfo.propTypes = {
  orderHash: T.string,
}

export default PaymentOrderInfo
