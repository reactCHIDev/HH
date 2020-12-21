/* eslint-disable react/prop-types */
import React from 'react'
import styles from './row.module.scss'

function index({ item, setOrderIdToShow }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.columnsWrapper}>
          <div className={styles.time}>
            <div>{item.date}</div>
            <div>{item.time}</div>
          </div>
          <div className={styles.id}>#{item.id}</div>
          <div className={styles.items}>{item.items}</div>
          <div className={styles.amount}>$ {item.amount}</div>
          <div className={styles.delivery}>{item.delivery}</div>
          <div className={styles.status}>{item.status}</div>
        </div>
        <div className={styles.lastSection}>
          <button
            onClick={() => {
              setOrderIdToShow(item.id)
            }}
            type="button"
          >
            {' '}
            {'>'}{' '}
          </button>
        </div>
      </div>
    </>
  )
}

export default index
