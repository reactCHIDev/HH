/* eslint-disable no-unused-vars */
import React from 'react'
import { Tabs } from 'antd'
import T from 'prop-types'
import styles from './tabscard.module.scss'
import './tabs.less'

const { TabPane } = Tabs

function callback(key) {
  // console.log(key)
}

const HHTabs = ({ tabs }) => {
  const extraMark = (el) => <span className={styles.extraMark}>{el}</span>
  return (
    <div className="tabs-card-container">
      <Tabs
        type="card"
        defaultActiveKey="1"
        tabPosition="top"
        tabBarGutter={0}
        onChange={callback}
        tabBarStyle={{
          background: '#F5F8FB',
          fontSize: 14,
          letterSpacing: '0.5px',
          textTransform: 'capitalize',
        }}
      >
        {Object.keys(tabs).map((tab) => (
          <TabPane
            tab={
              <span>
                {tab}
                {tabs[tab].mark && extraMark(tabs[tab].mark)}
              </span>
            }
            key={tab}
          >
            <div>{tabs[tab].content}</div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

HHTabs.propTypes = {
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
      content: T.node,
    }),
  }),
}

export default HHTabs
