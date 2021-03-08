/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { removeFLOrder } from 'actions/foodlover-orders'
import { getFLBookingInfoAC } from 'actions/experience'

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
    getFLBookingInfoAC,
    orderInfo,
  } = props
  const { orderHash } = useParams()

  const goBack = () => {
    replaceRoute(`/account_info/orders`)
    removeOrder()
  }

  useEffect(() => {
    getFLBookingInfoAC(order)
  }, [])

  return (
    <div className={styles.container}>
      <SubHeader
        linkTo="/account_info/orders"
        onBack={goBack}
        title={orderInfo?.experience?.title}
      />
      <TabsUnderlined
        tabs={{
          'Main Info': {
            mark: false,
            content: <MainInfo />,
          },
          'Payment Info': {
            disabled: false,
            mark: false,
            content: <PaymentInfo />,
          },
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

export default connect(({ experience }) => ({ orderInfo: experience.flBookingByID }), {
  replaceRoute: replace,
  removeOrder: removeFLOrder,
  getFLBookingInfoAC,
})(OrderInfo)
