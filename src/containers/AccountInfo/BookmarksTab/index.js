import React from 'react'
import T from 'prop-types'
import TabsOpen from 'components/Tabs/TabsOpen'
import OrdersFL from '../OrdersFL'
import FavExperiences from './FavExperiences'
import FavProducts from './FavProducts'
import FavMakers from './FavFoodmakers'

import styles from './bookmarkstab.module.scss'

const BookmarksTab = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TabsOpen
          tabs={{
            Experiences: { mark: 0, content: <FavExperiences /> },
            Products: { mark: 0, content: <FavProducts /> },
            Foodmakers: { mark: 0, content: <FavMakers /> },
            Shops: { mark: 0, content: <OrdersFL /> },
          }}
        />
      </div>
    </div>
  )
}

BookmarksTab.propTypes = {}

export default BookmarksTab
