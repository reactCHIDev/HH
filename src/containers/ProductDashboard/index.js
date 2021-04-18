import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import TabsUnderlined from 'components/Tabs/TabsUnderlined'
import Soon from 'components/ComingSoon'
import Listings from './components/Listings'
import OrdersFM from './components/OrdersFMTab'
import Reviews from './components/Reviews'
import styles from './proddb.module.scss'

const ProductDashboard = (props) => {
  const { replaceRoute } = props
  const { activeTab } = useParams()

  const onChange = (key) => {
    replaceRoute(`/product_dashboard/${key}`)
  }

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Product dashboard</p>
      <TabsUnderlined
        onChange={onChange}
        activeTab={activeTab || 'listings'}
        tabs={{
          // overview: { mark: false, disabled: true, content: <Soon /> },
          listings: { mark: false, content: <Listings /> },
          orders: { mark: false, disabled: false, content: <OrdersFM /> },
          reviews: { mark: false, disabled: false, content: <Reviews /> },
          // performance: { mark: false, disabled: true, content: <Soon /> },
        }}
      />
    </div>
  )
}

ProductDashboard.propTypes = {
  replaceRoute: T.func,
}

export default connect(null, {
  replaceRoute: replace,
})(ProductDashboard)
