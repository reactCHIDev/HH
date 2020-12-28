import React from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'
import styles from './billing.module.scss'

function BillingHistory() {
  const billings = useSelector((state) => state.billingHistory.orders)

  return (
    <div className={styles.container}>
      <Table billings={billings} />
    </div>
  )
}

export default BillingHistory
