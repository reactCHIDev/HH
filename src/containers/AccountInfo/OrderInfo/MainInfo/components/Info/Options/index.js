/* eslint-disable react/prop-types */
import React from 'react'
import styles from './options.module.scss'

function Options({ setIsCancelModalShowm, total, orderInfo }) {
  const priceToShow = (isFirstPart, sum = 0) => {
    const curPrice = sum.toFixed(2)
    if (isFirstPart) {
      return curPrice.substring(0, curPrice.indexOf('.'))
    }
    return curPrice.substring(curPrice.lastIndexOf('.') + 1)
  }
  return (
    <>
      <div className={styles.container}>
        <div>
          <div>Delivery</div>
          <div className={styles.deliveryType}>{orderInfo?.deliveryMethod}</div>
        </div>
        <div className={styles.price}>$ {orderInfo?.deliveryPrice}</div>
      </div>
      <div
        className={styles.cancelWrapper}
        // remove next line after uncomment `content` div
        style={{ justifyContent: 'flex-end' }}
      >
        {/* <div className={styles.content}>
          <div
            className={styles.modalHandler}
            onClick={() => {
              setIsCancelModalShowm(true)
            }}
          >
            Cancel order
          </div>
          <div>Cancellation policy</div>
        </div> */}
        <div>
          Total: <span className={styles.total}>${priceToShow(true, total)}.</span>
          {priceToShow(false, total)}
        </div>
      </div>
    </>
  )
}

export default Options
