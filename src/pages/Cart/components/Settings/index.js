import React from 'react'
import styles from './settings.module.scss'

function Settings() {
  return (
    <div className={styles.container}>
      <div className={styles.backTextWrapper}>
        <p>{'<'}</p>
        <p>CONTINUE SHOPPING</p>
      </div>
      <div className={styles.orderWrapper}>
        <div className={styles.orderTextWrapper}>
          <p className={styles.totalText}>Total: </p>
          <p className={styles.currencyText}>$</p>
          <p className={styles.mainPriceText}>173</p>
          <p>.30</p>
        </div>
        <div>
          <button className={styles.orderButton} type="button">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
