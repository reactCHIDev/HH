import React from 'react'
import TabsOpen from 'components/Tabs/TabsOpen'

import Soon from 'components/ComingSoon'
import ProductsReview from '../ProductsReview'

const OrdersTab = () => {
  return (
    <div style={{ paddingTop: '32px' }}>
      <div>
        <TabsOpen
          tabs={{
            Products: { mark: 0, content: <ProductsReview /> },
            Experiences: { disabled: true, mark: 0, content: <Soon /> },
          }}
        />
      </div>
    </div>
  )
}

export default OrdersTab
