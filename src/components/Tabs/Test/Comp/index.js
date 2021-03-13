/* eslint-disable react/prop-types */
import React from 'react'
import TabsOpen from 'components/Tabs/TabsOpen'
import Login from 'containers/Auth/components/Login'
import T from 'prop-types'
import './tabs.less'

const HHTabsOpen = () => {
  return (
    <div className="container">
      <TabsOpen
        tabs={{
          experiences: { mark: 0, content: null },
          products: {
            mark: 23,
            content: <Login />,
          },
          foodmakers: { mark: 3, content: null },
        }}
      />
    </div>
  )
}

HHTabsOpen.Types = {
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
    }).isRequired,
  }).isRequired,
}

export default HHTabsOpen
