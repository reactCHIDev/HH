import React from 'react'
import T from 'prop-types'
import TabsOpen from 'components/Tabs/TabsOpen'
import FoodmakerProfile from 'containers/Dashboard/FoodmakerProfile'
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
            'Foodmaker profile': { mark: 0, content: <FoodmakerProfile /> },
            'Shop profile': {
              mark: 0,
              content: <ShopProfile />,
            },
            Contacts: { mark: 0, content: <Soon /> },
          }}
        />
      </div>
    </div>
  )
}

ProfileTab.propTypes = {}

export default ProfileTab
