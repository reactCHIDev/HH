import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getItem } from 'utils/localStorage'
import TabsUnderlined from 'components/Tabs/TabsUnderlined'
import Soon from 'components/ComingSoon'
import Exp from 'components/Tabs/Test/Exp'
import Comp from 'components/Tabs/Test/Comp'
import Listings from 'containers/Dashboard/Account/Listings'
import ProfileTab from 'containers/Dashboard/ExperienceDashboard/ProfileTab'
import styles from './expdb.module.scss'
import './expdb.less'

const ExperienceDashboard = (props) => {
  const { profileName } = props
  const { activeTab } = useParams()

  console.log('%c   activeTab   ', 'color: darkgreen; background: palegreen;', activeTab)

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Experience dashboard</p>
      <TabsUnderlined
        activeTab={activeTab || 'overview'}
        tabs={{
          overview: { mark: false, content: <Soon /> },
          listings: { mark: false, content: <Listings /> },
          booking: { mark: false, content: <Soon /> },
          reviews: { mark: false, content: <Soon /> },
          performance: { mark: false, content: <Soon /> },
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

ExperienceDashboard.propTypes = {
  profileName: T.string.isRequired,
}

export default connect(({ login: { profileName } }) => ({ profileName }), null)(ExperienceDashboard)