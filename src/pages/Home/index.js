import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import T from 'prop-types'
import TabsUnderlined from 'components/Tabs/TabsUnderlined'
import styles from './home.module.scss'

const Home = (props) => {
  const { push } = props

  return (
    <div className={styles.container}>
      <TabsUnderlined
        tabs={{
          bookmark: { mark: false, content: null },
          orders: {
            mark: false,
            content: null,
          },
          review: { mark: true, content: null },
          'blog submission': { mark: false, content: null },
          profile: { mark: false, content: null },
        }}
      />
      <div className={styles.content}>
        <p>Home page</p>
        <p>No content yet</p>
      </div>
    </div>
  )
}

Home.propTypes = {}

export default connect(null, { push })(Home)
