/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

import styles from './options.module.scss'

function Options({ setIsCancelModalShowm, total, orderInfo }) {
  const priceToShow = (isFirstPart, sum = 0) => {
    const curPrice = sum.toFixed(2)
    if (isFirstPart) {
      return curPrice.substring(0, curPrice.indexOf('.'))
    }
    return curPrice.substring(curPrice.lastIndexOf('.') + 1)
  }

  const typePrettier = (type) => {
    if (type === 'Express') return 'Express'
    if (type === 'Standard') return 'Standard'
    if (type === 'FreeDelivery') return 'Free'
    if (type === 'FreePickUp') return 'Pick up'
    return null
  }

  return (
    <>
      <div className={styles.container}>
        <div>
          <div>Delivery</div>
          <div className={styles.deliveryType}>{typePrettier(orderInfo?.deliveryMethod)}</div>
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
        <div className={styles.totalContainer}>
          Total: <span className={styles.total}>${priceToShow(true, total)}.</span>
          {priceToShow(false, total)}
        </div>
        <Link
          to={{
            pathname: '/messages',
            state: {
              id: orderInfo?.foodmaker?.id,
              profileName: orderInfo?.foodmaker?.profileName,
              userPhoto: orderInfo?.foodmaker?.coverPhoto,
            },
          }}
        >
          <div
            className={styles.expCancelBtn}
            onClick={() => {
              console.log('%c   cancel   ', 'color: darkgreen; background: palegreen;')
            }}
          >
            Cancel booking
          </div>
        </Link>
      </div>
    </>
  )
}

export default Options
