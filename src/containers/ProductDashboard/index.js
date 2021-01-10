import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import { getItem } from 'utils/localStorage'
import TabsUnderlined from 'components/Tabs/TabsUnderlined'
import Soon from 'components/ComingSoon'
import Listings from './components/Listings'
import ProfileTab from './components//ProfileTab'
import OrdersFM from './components/OrdersFMTab'
import styles from './expdb.module.scss'

const ProductDashboard = (props) => {
  const { profileName, replaceRoute } = props
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
          overview: { mark: false, disabled: true, content: <Soon /> },
          listings: { mark: false, content: <Listings /> },
          orders: { mark: false, disabled: false, content: <OrdersFM /> },
          reviews: { mark: false, disabled: true, content: <Soon /> },
          performance: { mark: false, disabled: true, content: <Soon /> },
          profile: { mark: false, content: <ProfileTab profileName={profileName} /> },
          /*           orders: {
            mark: false,
            content: <Exp />,
          },
          review: { mark: true, content: null },
          'blog submission': { mark: false, content: <Comp /> }, */
        }}
      />
    </div>
  )
}

ProductDashboard.propTypes = {
  profileName: T.string.isRequired,
  replaceRoute: T.func,
}

export default connect(({ login: { profileName } }) => ({ profileName }), {
  replaceRoute: replace,
})(ProductDashboard)
