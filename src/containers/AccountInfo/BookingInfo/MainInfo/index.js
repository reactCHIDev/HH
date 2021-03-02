/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react'
import T from 'prop-types'
import { getFLBookingInfoAC } from 'actions/experience'
import { connect } from 'react-redux'
import ExpInfo from './components/ExpInfo'
import MakerInfo from './components/MakerInfo'
import styles from './maininfo.module.scss'

const MainOrderInfo = ({ order, getFLBookingInfoAC, orderInfo }) => {
  useEffect(() => {
    getFLBookingInfoAC(order)
  }, [])

  console.log(order, 'order')

  return (
    orderInfo && (
      <div className={styles.container}>
        <MakerInfo />
        <ExpInfo />
      </div>
    )
  )
}

MainOrderInfo.propTypes = {
  order: T.shape(),
  getFLOrderAC: T.func,
}

export default connect(({ flOrders }) => ({ orderInfo: flOrders.order }), {
  getFLBookingInfoAC,
})(MainOrderInfo)
