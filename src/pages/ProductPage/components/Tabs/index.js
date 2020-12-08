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

const Tabs = (props) => {
  const {
    product: { description, ingedients, deliveryRegion, refundPolicy, refundPolicyNote },
  } = props

  const tabs = {
    INFORMATION: {
      content: <InformationTab description={description} ingedients={ingedients} />,
    },
    REVIEWS: {
      content: <ReviewTab />,
    },
    'DELIVERY INFO': {
      content: <DeliveryInfoTab region={deliveryRegion} />,
    },
    'REFUND POLICY': {
      content: <RefundPolicyTab refund={refundPolicy} note={refundPolicyNote} />,
    },
  }

  return (
    <div className={cls('product-tabs', styles.container)}>
      <TabsComponent tabs={tabs} />
    </div>
  )
}

Tabs.propTypes = {
  product: T.shape,
  description: T.string,
  ingedients: T.string,
  deliveryRegion: T.string,
  refundPolicy: T.string,
  refundPolicyNote: T.string,
}

export default Tabs
