/* eslint-disable react/prop-types */
import React from 'react'
import styles from './table.module.scss'

function Row({ item }) {
  return (
    <div className={styles.rowWrapper}>
      <div className={styles.mainInfo}>
        <div className={styles.productImage} style={{ backgroundImage: `url('${''})` }} />
        <div>
          <div className={styles.name}>{item.productName}</div>
          <div className={styles.id}>#{item.id}</div>
        </div>
      </div>
      <div className={styles.qty}>{item.quantity}</div>
      <div className={styles.price}>$ {item.price}</div>
      <div className={styles.total}>$ {item.total}</div>
    </div>
  )
}

export default Row
