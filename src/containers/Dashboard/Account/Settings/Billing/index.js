import React from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'
import styles from './billing.module.scss'

function BillingHistory() {
  const billings = useSelector((state) => state.billingHistory.orders)

  return (
    <div className={styles.container}>
      <div className={styles.table_scroller}>
        <Table billings={billings} />
      </div>
    </div>
  )
}

export default BillingHistory
