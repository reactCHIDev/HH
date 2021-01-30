import React, { useEffect } from 'react'
import T from 'prop-types'
import { getFMOrderAC, removeFMOrder } from 'actions/foodmaker-orders'
import SubHeader from 'components/SubHeader'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import MainInfo from './MainInfo'
import styles from './orderinfo.module.scss'

const OrderFMInfo = (props) => {
  const {
    replaceRoute,
    getFMOrderAC,
    removeOrder,
    location: { state: order },
  } = props
  const { orderHash } = useParams()

  useEffect(() => {
    getFMOrderAC(order?.id)
  }, [order])

  const goBack = () => {
    replaceRoute(`/product_dashboard/orders`)
    removeOrder()
  }

  return (
    <div className={styles.container}>
      <SubHeader linkTo="/product_dashboard/orders" onBack={goBack} title={`order #${order.id}`} />
      <MainInfo order={order} />
      <div className={styles.content} />
    </div>
  )
}

OrderFMInfo.propTypes = {
  location: T.shape(),
  replaceRoute: T.func,
  getFMOrderAC: T.func,
  removeOrder: T.func,
}

export default connect(null, {
  replaceRoute: replace,
  getFMOrderAC,
  removeOrder: removeFMOrder,
})(OrderFMInfo)
