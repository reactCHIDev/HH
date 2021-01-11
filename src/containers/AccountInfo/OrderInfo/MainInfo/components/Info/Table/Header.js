import React from 'react'
import styles from './table.module.scss'

function Header() {
  return (
    <div className={styles.headerWrapper}>
      <div style={{ width: '70%' }} />
      <div className={styles.qty}>Qty</div>
      <div className={styles.price}>Price</div>
      <div className={styles.total}>Total</div>
    </div>
  )
}

export default Header
