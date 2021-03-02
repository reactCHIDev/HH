/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react'
import T from 'prop-types'
import { getFLOrderAC } from 'actions/foodlover-orders'
import { connect } from 'react-redux'
import ExpInfo from './components/ExpInfo'
import MakerInfo from './components/MakerInfo'
import styles from './maininfo.module.scss'

const MainOrderInfo = ({ order, getFLOrderAC, orderInfo }) => {
  useEffect(() => {
    getFLOrderAC(order?.id)
  }, [order])

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
  getFLOrderAC,
})(MainOrderInfo)
