/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

import styles from './row.module.scss'

function index({ item }) {
  const day = new Date(item.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
  })
  const month = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
  })
  const time = new Date(item.createdAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: false,
    minute: '2-digit',
  })

  return (
    <>
      <Link to={{ pathname: '/fm_order_info', state: item }}>
        <div className={styles.container}>
          <div className={styles.columnsWrapper}>
            <div className={styles.time}>
              <div className={styles.date}>
                {day} {month}
              </div>
              <div>{time}</div>
            </div>
            <div className={styles.id}>#{item.id}</div>
            <div className={styles.client}>{item.clientName || 'anonim'}</div>
            <div className={styles.items}>{item.totalItems}</div>
            <div className={styles.amount}>$ {item.orderTotal.toFixed(2)}</div>
            <div className={styles.delivery}>{item.deliveryMethod}</div>
            <div
              style={item.deliveryStatus === 'New Order' ? { color: '#7ad398' } : {}}
              className={styles.status}
            >
              {item.deliveryStatus}
            </div>
          </div>
          <div className={styles.lastSection}>
            <Link to={{ pathname: '/fm_order_info', state: item }}>
              <button type="button"> {'>'} </button>
            </Link>
          </div>
        </div>
      </Link>
    </>
  )
}

export default index
