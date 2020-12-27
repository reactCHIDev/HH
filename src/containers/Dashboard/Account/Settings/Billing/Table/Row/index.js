/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

import styles from './row.module.scss'

function index({ item }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.columnsWrapper}>
          <div className={styles.date}>{item.date}</div>
          <div className={styles.amount}>{item.amount}</div>
          <div className={styles.method}>{item.method}</div>
          <div
            className={styles.status}
            style={item.status === 'Successful' ? { color: '#7AD398' } : {}}
          >
            {item.status}
          </div>
        </div>
        <div className={styles.lastSection}>
          <Link>
            <button type="button"> GET INVOICE </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default index
