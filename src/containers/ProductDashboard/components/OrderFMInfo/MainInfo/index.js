import React, { useEffect } from 'react'
import T from 'prop-types'

import { getFoodmakerOrderInfoReq } from 'api/requests/foodmaker'
import styles from './maininfo.module.scss'
import OrderInfo from './OrderInfo'
import Chat from './Chat'

const MainOrderInfo = ({ order }) => {
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
  order: T.shape(),
}

export default MainOrderInfo
