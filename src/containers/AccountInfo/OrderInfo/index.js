import React, { useState, useEffect } from 'react'
import T from 'prop-types'
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
  } = props
  const { orderHash } = useParams()

  const goBack = () => {
    replaceRoute(`/account_info/orders`)
  }

  return (
    <div className={styles.container}>
      <SubHeader linkTo="/account_info/orders" onBack={goBack} title={`order ${order.id}`} />
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
}

export default connect(({ orders }) => ({ orders }), {
  replaceRoute: replace,
})(OrderInfo)
