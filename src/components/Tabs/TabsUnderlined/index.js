import React from 'react'
import { Tabs } from 'antd'
import T from 'prop-types'
import styles from './tabs.module.scss'
import './tabs.less'

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

const TabsUnderlined = ({ tabs }) => {
  const extraMark = () => <span className={styles.extraMark} />
  return (
    <div className="tabs-underlined-container">
      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        tabBarGutter={20}
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
                {tabs[tab].mark && extraMark()}
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

TabsUnderlined.propTypes = {
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
      content: T.node,
    }).isRequired,
  }).isRequired,
}

export default TabsUnderlined
