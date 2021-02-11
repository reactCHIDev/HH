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
    product: { id, description, ingredients, refundPolicy, deliveryRegion, refundPolicyNote },
    deliveryMethods,
    productReviews,
    productReviewsCount,
    currentPage,
    isUserCanReview,
  } = props

  const tabs = {
    INFORMATION: {
      content: <InformationTab description={description} ingredients={ingredients} />,
    },
    REVIEWS: {
      content: (
        <ReviewTab
          productReviews={productReviews}
          productReviewsCount={productReviewsCount}
          currentPage={currentPage}
          productId={id}
          isUserCanReview={isUserCanReview}
        />
      ),
      mark: productReviewsCount,
    },

    'DELIVERY INFO': {
      content: <DeliveryInfoTab region={deliveryRegion} deliveryMethods={deliveryMethods} />,
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
  ingredients: T.string,
  deliveryMethods: T.shape,
  refundPolicy: T.string,
  refundPolicyNote: T.string,
}

export default Tabs
