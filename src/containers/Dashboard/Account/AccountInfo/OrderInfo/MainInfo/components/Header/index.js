import React from 'react'
import styles from './header.module.scss'

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.mainOrderInfo}>
        <div className={styles.info}>
          <div className={styles.option}>Order ID</div>
          <div className={styles.id}>#3432434</div>
        </div>
        <div className={styles.info}>
          <div className={styles.option}>Date/time</div>
          <div className={styles.text}>Jul, 25 10:25</div>
        </div>
        <div className={styles.info}>
          <div className={styles.option}>Delivery</div>
          <div className={styles.text}>Express</div>
        </div>
        <div className={styles.info}>
          <div className={styles.option}>Status</div>
          <div className={styles.text}>Shipped</div>
        </div>
      </div>
      <div>
        <div className={styles.invoice}>Share Invoice</div>
      </div>
    </div>
  )
}

export default Header
