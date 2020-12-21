import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import SubHeader from 'components/SubHeader'
import TabsUnderlined from 'components/Tabs/TabsUnderlined'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import MainInfo from './MainInfo'
import Soon from 'components/ComingSoon'
import styles from './orderinfo.module.scss'
import './orderinfo.less'

const OrderInfo = (props) => {
  const { orders, replaceRoute } = props
  const { orderHash } = useParams()

  const goBack = () => {
    replaceRoute(`/account_info/orders`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.subheader_container}>
        <SubHeader linkTo="/account_info/orders" onBack={goBack} title={`order ${orderHash}`} />
      </div>
      <TabsUnderlined
        tabs={{
          'Main Info': { mark: false, content: <MainInfo orderHash={orderHash} /> },
          'Payment Info': { mark: false, content: <Soon /> },
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
