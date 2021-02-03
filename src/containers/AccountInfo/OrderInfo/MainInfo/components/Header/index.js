/* eslint-disable react/prop-types */
import React from 'react'
import shareInvoiceIcon from 'assets/icons/svg/share-invoice-icon.svg'
import styles from './header.module.scss'

function Header({ id, date, time, deliveryType, deliveryStatus, receipt }) {
  return (
    <div className={styles.header}>
      <div className={styles.mainOrderInfo}>
        <div className={styles.info}>
          <div className={styles.option}>Order ID</div>
          <div className={styles.id}>#{id}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.option}>Date/time</div>
          <div className={styles.text}>
            {date} {time}
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.option}>Delivery</div>
          <div className={styles.text}>{deliveryType}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.option}>Status</div>
          <div className={styles.text}>{deliveryStatus}</div>
        </div>
      </div>
      <div>
        <div
          className={styles.invoice}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            window.open(receipt, '_blank')
          }}
        >
          <img alt="share-invoice-icon" src={shareInvoiceIcon} />
          <div>Open Invoice</div>
        </div>
      </div>
    </div>
  )
}

export default Header
