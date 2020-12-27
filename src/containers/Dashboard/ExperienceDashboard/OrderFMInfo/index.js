import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import SubHeader from 'components/SubHeader'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import MainInfo from './MainInfo'
import styles from './orderinfo.module.scss'

const OrderFMInfo = (props) => {
  const { replaceRoute } = props
  const { orderHash } = useParams()

  const goBack = () => {
    replaceRoute(`/exp_dashboard/orders`)
  }

  return (
    <div className={styles.container}>
      <SubHeader linkTo="/exp_dashboard/orders" onBack={goBack} title={`order ${orderHash}`} />
      <MainInfo orderHash={orderHash} />
      <div className={styles.content} />
    </div>
  )
}

OrderFMInfo.propTypes = {
  replaceRoute: T.func,
}

export default connect(null, {
  replaceRoute: replace,
})(OrderFMInfo)
