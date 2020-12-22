import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import SubHeader from 'components/SubHeader'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import MainInfo from './MainInfo'
import styles from './orderinfo.module.scss'
import './orderinfo.less'

const OrderFMInfo = (props) => {
  const { orders, replaceRoute } = props
  const { orderHash } = useParams()

  const goBack = () => {
    replaceRoute(`/exp_dashboard/orders`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.subheader_container}>
        <SubHeader linkTo="/exp_dashboard/orders" onBack={goBack} title={`order ${orderHash}`} />
      </div>
      <MainInfo orderHash={orderHash} />
      <div className={styles.content} />
    </div>
  )
}

OrderFMInfo.propTypes = {
  replaceRoute: T.func,
}

export default connect(({ orders }) => ({ orders }), {
  replaceRoute: replace,
})(OrderFMInfo)
