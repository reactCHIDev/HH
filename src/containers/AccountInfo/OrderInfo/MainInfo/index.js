/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react'
import T from 'prop-types'
import { getFLOrderAC } from 'actions/foodlover-orders'
import { connect } from 'react-redux'
import styles from './maininfo.module.scss'
import Header from './components/Header'
import Modal from './components/Modal'
import Info from './components/Info'
import Maker from './components/Maker'

const MainOrderInfo = ({ order, getFLOrderAC, orderInfo }) => {
  const [isCancelModalShown, setIsCancelModalShowm] = React.useState(false)

  useEffect(() => {
    getFLOrderAC(order?.id)
  }, [order])

  const escFunction = React.useCallback((event) => {
    if (event.keyCode === 27) {
      setIsCancelModalShowm(false)
    }
  }, [])

  React.useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [])

  const day = new Date(orderInfo.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
  })
  const month = new Date(orderInfo.createdAt).toLocaleDateString('en-US', {
    month: 'short',
  })

  const time = new Date(orderInfo.createdAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: false,
    minute: '2-digit',
  })

  return (
    orderInfo && (
      <div className={styles.container}>
        {isCancelModalShown ? <Modal /> : null}
        <Header
          id={orderInfo.id}
          date={`${day}, ${month}`}
          time={time}
          deliveryType={orderInfo.deliveryMethod}
          deliveryStatus={orderInfo.deliveryStatus}
        />
        <div className={styles.content}>
          {orderInfo.foodmaker && <Maker info={orderInfo.foodmaker} />}
          <Info
            setIsCancelModalShowm={setIsCancelModalShowm}
            orderInfo={orderInfo}
            // total={orderInfo.amount}
            // shopName={orderInfo.shopName}
          />
        </div>
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
