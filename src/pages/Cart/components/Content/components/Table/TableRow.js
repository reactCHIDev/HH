/* eslint-disable react/prop-types */
import React from 'react'
import styles from './table.module.scss'

function TableRow({ item, handler }) {
  return (
    <tr key={item.id} className={styles.tableRow}>
      <td>
        <div className={styles.firstColumn}>
          <div>
            <div style={{ background: item.img }} className={styles.productImage}>
              {item.isHit ? <div className={styles.hitProduct}>HIT</div> : null}
            </div>
          </div>
          <div>
            <div className={styles.productName}>{item.name}</div>
            <div className={styles.productCode}>#{item.code}</div>
          </div>
        </div>
      </td>
      <td>{item.selectedValue}</td>
      <td>
        <div className={styles.quanityWrapper}>
          <div
            className={styles.sign}
            onClick={() => {
              if (item.quantity < 2) return
              handler(item.id, false)
            }}
          >
            -
          </div>
          <div className={styles.quantity}>{item.quantity}</div>
          <div className={styles.sign} onClick={() => handler(item.id, true)}>
            +
          </div>
        </div>
      </td>
      <td>${item.price}</td>
      <td>${item.price * item.quantity}</td>
      <td>
        <div className={styles.deleteIcon}>
          <div>x</div>
        </div>
      </td>
    </tr>
  )
}

export default TableRow
