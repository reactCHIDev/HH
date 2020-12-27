/* eslint-disable react/prop-types */
import React from 'react'
import styles from './options.module.scss'

function Options({ setIsCancelModalShowm, total }) {
  return (
    <>
      <div className={styles.container}>
        <div>
          <div>Delivery</div>
          <div className={styles.deliveryType}>Standart</div>
        </div>
        <div className={styles.price}>$ 20.00</div>
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
