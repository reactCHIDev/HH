import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import TabsComponent from 'components/Tabs/TabsCard'
import InformationTab from './Information'
import ReviewTab from './Reviews'
import DeliveryInfoTab from './DeliveryInfo'
import RefundPolicyTab from './RefundPolicy'
import styles from './tabs.module.scss'
import './tabs.less'

const Tabs = () => {
  const tabs = {
    INFORMATION: {
      content: <InformationTab />,
    },
    REVIEWS: {
      content: <ReviewTab />,
    },
    'DELIVERY INFO': {
      content: <DeliveryInfoTab />,
    },
    'REFUND POLICY': {
      content: <RefundPolicyTab />,
    },
  }

  return (
    <div className={cls('product-tabs', styles.container)}>
      <TabsComponent tabs={tabs} />
    </div>
  )
}

Tabs.propTypes = {}

export default Tabs
