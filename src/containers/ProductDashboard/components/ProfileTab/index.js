import React from 'react'
import T from 'prop-types'
import TabsOpen from 'components/Tabs/TabsOpen'
import Soon from 'components/ComingSoon'
import FoodmakerProfile from '../FoodmakerProfile'
import ShopProfile from '../ShopProfile'
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
            Contacts: { mark: 0, disabled: true, content: <Soon /> },
          }}
        />
      </div>
    </div>
  )
}

ProfileTab.propTypes = {}

export default ProfileTab
