import React from 'react'
import { Tabs } from 'antd'
import T from 'prop-types'
import styles from './tabsopen.module.scss'
import './tabs.less'

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}
const TabsOpen = ({ tabs }) => {
  const extraMark = (num) => (
    <div className="extra-mark" style={{ fontSize: 12, paddingTop: 6 }}>
      {num}
    </div>
  )
  return (
    <div className="tabs-open-container">
      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        tabBarGutter={12}
        onChange={callback}
        tabBarStyle={{
          background: 'white',
          fontSize: 32,
          color: '#31394D',
          letterSpacing: '0.5px',
          textTransform: 'capitalize',
        }}
      >
        {Object.keys(tabs).map((tab) => (
          <TabPane
            tab={
              <div style={{ display: 'flex' }}>
                {tab}
                {tabs[tab].mark > 0 && extraMark(tabs[tab].mark)}
              </div>
            }
            key={tab}
            disabled={tabs[tab].disabled}
          >
            <div>{tabs[tab].content}</div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

TabsOpen.propTypes = {
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
      content: T.node,
    }).isRequired,
  }).isRequired,
}

export default TabsOpen
