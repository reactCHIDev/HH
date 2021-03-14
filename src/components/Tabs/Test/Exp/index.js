import React from 'react'
import Comp from 'components/Tabs/Test/Comp'
import T from 'prop-types'
import './tabs.less'

const HHTabsOpen = () => {
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
