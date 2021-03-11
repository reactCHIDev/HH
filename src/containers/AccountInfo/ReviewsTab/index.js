import React from 'react'
import { useSelector } from 'react-redux'
import TabsOpen from 'components/Tabs/TabsOpen'

import Soon from 'components/ComingSoon'
import ProductsReview from '../ProductsReview'
import ExperiencesReview from '../ExperiencesReview'

const OrdersTab = () => {
  const reviewsCount = useSelector((state) => state.reviews.count)
  return (
    <div style={{ paddingTop: '32px' }}>
      <div>
        <TabsOpen
          tabs={{
            Products: { mark: reviewsCount, content: <ProductsReview /> },
            Experiences: { disabled: false, mark: 0, content: <ExperiencesReview /> },
          }}
        />
      </div>
    </div>
  )
}

export default OrdersTab
