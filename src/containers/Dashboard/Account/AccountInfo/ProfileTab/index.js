import React from 'react'
import T from 'prop-types'
import TabsOpen from 'components/Tabs/TabsOpen'
import Profile from 'containers/Dashboard/Account/Profile'
import Soon from 'components/ComingSoon'
import ShopProfile from 'containers/Dashboard/ShopProfile'
import styles from './profiletab.module.scss'
// import './profiletab.less'

const ProfileTab = (props) => {
  const { x } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TabsOpen
          tabs={{
            Profile: { mark: 0, content: <Profile /> },
          }}
        />
      </div>
    </div>
  )
}

ProfileTab.propTypes = {}

export default ProfileTab
