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
import ProfileTab from 'containers/Dashboard/Account/AccountInfo/ProfileTab'
import styles from './accinfo.module.scss'
import './accinfo.less'

const AccountInfo = (props) => {
  const { profileName } = props
  const { activeTab } = useParams()

  console.log('%c   activeTab   ', 'color: darkgreen; background: palegreen;', activeTab)

  return (
    <div className={styles.container}>
      <p className={styles.heading}>{`${profileName} account info`}</p>
      <TabsUnderlined
        activeTab={activeTab || 'overview'}
        tabs={{
          bookmarks: { mark: false, content: <Soon /> },
          orders: { mark: false, content: <Soon /> },
          review: { mark: false, content: <Soon /> },
          'blog submission': { mark: false, content: <Soon /> },
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
}

export default connect(({ account: { profileName } }) => ({ profileName }), null)(AccountInfo)
