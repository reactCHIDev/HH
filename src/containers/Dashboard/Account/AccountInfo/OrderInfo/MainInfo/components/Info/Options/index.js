/* eslint-disable react/prop-types */
import React from 'react'
import styles from './options.module.scss'

function Options({ setIsCancelModalShowm, total, orderInfo }) {
  return (
    <>
      <div className={styles.container}>
        <div>
          <div>Delivery</div>
          <div className={styles.deliveryType}>{orderInfo?.deliveryMethod}</div>
        </div>
        <div className={styles.price}>$ {orderInfo?.deliveryPrice}</div>
      </div>
      <div className={styles.cancelWrapper}>
        <div className={styles.content}>
          <div
            className={styles.modalHandler}
            onClick={() => {
              setIsCancelModalShowm(true)
            }}
          >
            Cancel order
          </div>
          <div>Cancellation policy</div>
        </div>
        <div>
          Total: <span className={styles.total}>${total}</span>.00
        </div>
      </div>
    </>
  )
}

export default Options
