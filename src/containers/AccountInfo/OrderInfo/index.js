/* eslint-disable react/prop-types */
import React from 'react'
import T from 'prop-types'
import { removeFLOrder } from 'actions/foodlover-orders'

import SubHeader from 'components/SubHeader'
import TabsUnderlined from 'components/Tabs/TabsUnderlined'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import MainInfo from './MainInfo'
import PaymentInfo from './PaymentInfo'
import styles from './orderinfo.module.scss'
import './orderinfo.less'

const OrderInfo = (props) => {
  const {
    location: { state: order },
    replaceRoute,
    removeOrder,
  } = props
  const { orderHash } = useParams()

  const goBack = () => {
    replaceRoute(`/account_info/orders`)
    removeOrder()
  }

  return (
    <div className={styles.container}>
      <SubHeader linkTo="/account_info/orders" onBack={goBack} title={`order #${order.id}`} />
      <TabsUnderlined
        tabs={{
          'Main Info': { mark: false, content: <MainInfo order={order} /> },
          'Payment Info': { mark: false, content: <PaymentInfo orderHash={orderHash} /> },
        }}
      />
      <div className={styles.content} />
    </div>
  )
}

OrderInfo.propTypes = {
  replaceRoute: T.func,
  removeOrder: T.func,
}

export default connect(({ orders }) => ({ orders }), {
  replaceRoute: replace,
  removeOrder: removeFLOrder,
})(OrderInfo)
