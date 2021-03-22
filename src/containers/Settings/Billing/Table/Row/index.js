/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react'

import styles from './row.module.scss'

function index({ item }) {
  const date = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <>
      <div className={styles.container}>
        <div className={styles.columnsWrapper}>
          <div className={styles.date}>{date}</div>
          <div className={styles.amount}>${item.amount}</div>
          <div className={styles.method}>{`${item.card.brand} *${item.card.number}`}</div>
          <div
            className={styles.status}
            style={item.status === 'Successful' ? { color: '#7AD398' } : {}}
          >
            {item.status}
          </div>
        </div>
        <div className={styles.lastSection}>
          <button
            type="button"
            onClick={() => {
              window.open(item.receiptUrl, '_blank')
            }}
          >
            GET INVOICE
          </button>
        </div>
      </div>
    </>
  )
}

export default index
