import React, { useEffect } from 'react'
import T from 'prop-types'
import { getFLOrderAC } from 'actions/foodlover-orders'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import styles from './maininfo.module.scss'
import Header from './components/Header'
import Modal from './components/Modal'
import Info from './components/Info'
import Maker from './components/Maker'

const MainOrderInfo = ({ order, getFLOrderAC }) => {
  const [isCancelModalShown, setIsCancelModalShowm] = React.useState(false)
  const orderInfo = order

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
  return (
    <div className={styles.container}>
      {isCancelModalShown ? <Modal /> : null}
      <Header
        id={orderInfo.id}
        date={orderInfo.date}
        time={orderInfo.time}
        deliveryType={orderInfo.delivery}
        deliveryStatus={orderInfo.status}
      />
      <div className={styles.content}>
        <Maker info={orderInfo.id} />
        <Info
          setIsCancelModalShowm={setIsCancelModalShowm}
          orderInfo={orderInfo.orderInfo}
          total={orderInfo.amount}
          shopName={orderInfo.shopName}
        />
      </div>
    </div>
  )
}

MainOrderInfo.propTypes = {
  order: T.shape(),
  getFLOrderAC: T.func,
}

export default connect(null, {
  getFLOrderAC,
})(MainOrderInfo)
