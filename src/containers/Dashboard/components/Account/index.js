import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getItem } from 'utils/localStorage'
import TabsUnderlined from 'components/Tabs/TabsUnderlined'
import Exp from 'components/Tabs/Test/Exp'
import Comp from 'components/Tabs/Test/Comp'
import Listings from 'containers/Dashboard/components/Account/Listings'
import Profile from 'containers/Dashboard/components/Account/Profile'
import styles from './account.module.scss'
import './account.less'

const Account = (props) => {
  const { profileName } = props

  return (
    <div className={styles.container}>
      <p className={styles.heading}>{`${profileName || getItem('user-name')}'s account info`}</p>
      <TabsUnderlined
        tabs={{
          listings: { mark: false, content: <Listings /> },
          profile: { mark: false, content: <Profile profileName={profileName} /> },
          orders: {
            mark: false,
            content: <Exp />,
          },
          review: { mark: true, content: null },
          'blog submission': { mark: false, content: <Comp /> },
        }}
      />
    </div>
  )
}

Account.propTypes = {
  profileName: T.string.isRequired,
}

export default connect(({ login: { profileName } }) => ({ profileName }), null)(Account)
