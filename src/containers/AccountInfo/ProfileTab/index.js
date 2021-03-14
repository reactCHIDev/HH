import React from 'react'
import TabsOpen from 'components/Tabs/TabsOpen'
import Profile from '../Profile'
import styles from './profiletab.module.scss'

const ProfileTab = () => {
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
