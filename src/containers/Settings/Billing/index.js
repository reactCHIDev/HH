import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBillingHistoryAC } from 'actions/billing-history'
import Table from './Table'
import styles from './billing.module.scss'

function BillingHistory() {
  const dispatch = useDispatch()
  const billings = useSelector((state) => state.billingHistory.orders)
  console.log(billings)

  React.useEffect(() => {
    dispatch(getBillingHistoryAC())
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.table_scroller}>{billings ? <Table billings={billings} /> : null}</div>
    </div>
  )
}

export default BillingHistory
