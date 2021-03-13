import React from 'react'
import TabsOpen from 'components/Tabs/TabsOpen'
import OrdersFL from '../OrdersFL'
import ExperiencesFl from '../ExpBookingHistory'

import styles from './orderstab.module.scss'
// import './orderstab.less'

const OrdersTab = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TabsOpen
          tabs={{
            Products: { mark: 0, content: <OrdersFL /> },
            Experiences: { mark: 0, content: <ExperiencesFl /> },
          }}
        />
      </div>
    </div>
  )
}

OrdersTab.propTypes = {}

export default OrdersTab
