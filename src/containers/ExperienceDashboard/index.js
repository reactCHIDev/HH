import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import { getItem } from 'utils/localStorage'
import TabsUnderlined from 'components/Tabs/TabsUnderlined'
import Soon from 'components/ComingSoon'
import ExpListings from './components/ExpListings'
import BookingHistory from './components/BookingHistory'
import styles from './expdb.module.scss'

const ExperienceDashboard = (props) => {
  const { profileName, shop, replaceRoute } = props
  const { activeTab } = useParams()

  const onChange = (key) => {
    replaceRoute(`/experience_dashboard/${key}`)
  }

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Experience dashboard</p>
      <TabsUnderlined
        onChange={onChange}
        activeTab={activeTab || 'listings'}
        tabs={{
          overview: { mark: false, disabled: false, content: <Soon /> },
          listings: { mark: false, content: <ExpListings /> },
          booking: { mark: false, disabled: false, content: <BookingHistory /> },
          reviews: { mark: false, disabled: false, content: <Soon /> },
          performance: { mark: false, disabled: false, content: <Soon /> },
          profile: { mark: false, content: <Soon /> },
        }}
      />
    </div>
  )
}

ExperienceDashboard.propTypes = {
  profileName: T.string.isRequired,
  replaceRoute: T.func,
}

export default connect(({ login: { profileName }, account: { shop } }) => ({ profileName, shop }), {
  replaceRoute: replace,
})(ExperienceDashboard)
