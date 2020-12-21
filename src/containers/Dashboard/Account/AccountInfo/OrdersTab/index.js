import React from 'react'
import T from 'prop-types'
import TabsOpen from 'components/Tabs/TabsOpen'
import OrdersFL from 'containers/Dashboard/OrdersFL'
import Soon from 'components/ComingSoon'
import ShopProfile from 'containers/Dashboard/ShopProfile'
import styles from './orderstab.module.scss'
// import './orderstab.less'

const OrdersTab = (props) => {
  const { x } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TabsOpen
          tabs={{
            Experiences: { mark: 0, content: <Soon /> },
            Products: { mark: 0, content: <OrdersFL /> },
          }}
        />
      </div>
    </div>
  )
}

OrdersTab.propTypes = {}

export default OrdersTab
