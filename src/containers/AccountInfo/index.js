import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import { getItem } from 'utils/localStorage'
import TabsUnderlined from 'components/Tabs/TabsUnderlined'
import Soon from 'components/ComingSoon'
import Exp from 'components/Tabs/Test/Exp'
import Comp from 'components/Tabs/Test/Comp'
// import Listings from '../ProductDashboard/components/Listings'
import ProfileTab from './ProfileTab'
import BookmarksTab from './BookmarksTab'
import OrdersTab from './OrdersTab'
import ReviewsTab from './ReviewsTab'
import styles from './accinfo.module.scss'
import './accinfo.less'

const AccountInfo = (props) => {
  const { profileName, replaceRoute } = props
  const { activeTab } = useParams()

  const onChange = (key) => {
    replaceRoute(`/account_info/${key}`)
  }

  return (
    <div className={styles.container}>
      <p className={styles.heading}>{`${profileName} account info`}</p>
      <TabsUnderlined
        onChange={onChange}
        activeTab={activeTab || 'profile'}
        tabs={{
          bookmarks: { mark: false, disabled: false, content: <BookmarksTab /> },
          orders: { mark: false, disabled: false, content: <OrdersTab /> },
          review: { mark: false, disabled: false, content: <ReviewsTab /> },
          'blog submission': { mark: false, disabled: true, content: <Soon /> },
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

AccountInfo.propTypes = {
  profileName: T.string.isRequired,
  replaceRoute: T.func,
}

export default connect(({ account: { profileName } }) => ({ profileName }), {
  replaceRoute: replace,
})(AccountInfo)
