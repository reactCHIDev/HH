import React from 'react'
import T from 'prop-types'

import styles from './maininfo.module.scss'
import OrderInfo from './OrderInfo'

const MainOrderInfo = ({ order }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <OrderInfo order={order} />
        {/* <Chat /> */}
      </div>
    </div>
  )
}

MainOrderInfo.propTypes = {
  order: T.shape(),
}

export default MainOrderInfo
