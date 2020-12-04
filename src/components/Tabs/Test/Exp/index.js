import React from 'react'
import TabsOpen from 'components/Tabs/TabsOpen'
import TabsCard from 'components/Tabs/TabsCard'
import Comp from 'components/Tabs/Test/Comp'
import T from 'prop-types'
import './tabs.less'

const HHTabsOpen = ({ tabs }) => {
  return (
    <div className="container">
      <Comp />
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
