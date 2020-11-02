import React from 'react'
import T from 'prop-types'
import { Upload } from 'antd'
// import ImgCrop from 'antd-img-crop'
import TabsUnderlined from 'components/Tabs/TabsUnderlined'
import Exp from 'components/Tabs/Test/Exp'
import Comp from 'components/Tabs/Test/Comp'
import Profile from 'containers/Dashboard/components/Account/Profile'
import styles from './account.module.scss'
import './account.less'

const Account = (props) => {
  const { x } = props

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Alex's account info</p>
      <TabsUnderlined
        tabs={{
          bookmark: { mark: false, content: null },
          orders: {
            mark: false,
            content: <Exp />,
          },
          review: { mark: true, content: null },
          'blog submission': { mark: false, content: <Comp /> },
          profile: { mark: false, content: <Profile /> },
        }}
      />
    </div>
  )
}

Account.propTypes = {
  a: T.number.isRequired,
  b: T.string.isRequired,
  c: T.bool.isRequired,
  f: T.func.isRequired,
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
      content: T.node,
    }).isRequired,
  }).isRequired,
}

export default Account
