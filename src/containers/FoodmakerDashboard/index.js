/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import TabsUnderlined from 'components/Tabs/TabsUnderlined'
import Soon from 'components/ComingSoon'
import FoodmakerProfile from './components/FoodmakerProfile'
import ShopProfile from './components/ShopProfile'
import styles from './proddb.module.scss'

const ProductDashboard = (props) => {
  const { shop, replaceRoute } = props
  const { activeTab } = useParams()

  const onChange = (key) => {
    replaceRoute(`/foodmaker_dashboard/${key}`)
  }

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Foodmaker profile</p>
      <TabsUnderlined
        onChange={onChange}
        activeTab={activeTab || 'foodmaker profile'}
        tabs={{
          'foodmaker profile': { mark: false, disabled: false, content: <FoodmakerProfile /> },
          'shop profile': { mark: false, disabled: !shop, content: <ShopProfile /> },
          contact: { mark: false, disabled: true, content: <Soon /> },
        }}
      />
    </div>
  )
}

ProductDashboard.propTypes = {
  profileName: T.string.isRequired,
  replaceRoute: T.func,
}

export default connect(({ login: { profileName }, account: { shop } }) => ({ profileName, shop }), {
  replaceRoute: replace,
})(ProductDashboard)
