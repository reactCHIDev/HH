import React from 'react'
import T from 'prop-types'
import { useSelector } from 'react-redux'
import styles from './maininfo.module.scss'
import Header from './components/Header'
import Modal from './components/Modal'
import Info from './components/Info'
import Maker from './components/Maker'

const MainOrderInfo = (props) => {
  const { orderHash } = props
  const orderInfo = useSelector((state) => state.flOrders.orders).find((e) => e.id === orderHash)

  const [isCancelModalShown, setIsCancelModalShowm] = React.useState(false)

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
        <Maker info={orderInfo.foodmakerInfo} />
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
  orderHash: T.string,
}

export default MainOrderInfo
