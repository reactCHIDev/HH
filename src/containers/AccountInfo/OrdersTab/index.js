import React from 'react'
import T from 'prop-types'
import TabsOpen from 'components/Tabs/TabsOpen'
import Soon from 'components/ComingSoon'
import OrdersFL from '../OrdersFL'
import styles from './orderstab.module.scss'
// import './orderstab.less'

const OrdersTab = (props) => {
  const { x } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TabsOpen
          tabs={{
            Products: { mark: 0, content: <OrdersFL /> },
            Experiences: { disabled: true, mark: 0, content: <Soon /> },
          }}
        />
      </div>
    </div>
  )
}

OrdersTab.propTypes = {}

export default OrdersTab
