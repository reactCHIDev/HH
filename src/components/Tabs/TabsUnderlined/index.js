import React from 'react'
import { Tabs } from 'antd'
import T from 'prop-types'

import styles from './tabs.module.scss'
import './tabs.less'

const { TabPane } = Tabs

const TabsUnderlined = ({ tabs, activeTab, onChange }) => {
  const extraMark = () => <span className={styles.extraMark} />
  return (
    <div className="tabs-underlined-container">
      <Tabs
        defaultActiveKey={activeTab}
        animated={false}
        tabPosition="top"
        tabBarGutter={20}
        onChange={onChange}
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
  activeTab: T.string,
  onChange: T.func,
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
      content: T.node,
    }),
  }).isRequired,
}

export default TabsUnderlined
