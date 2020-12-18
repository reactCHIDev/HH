/* eslint-disable react/prop-types */
import React from 'react'
import styles from '../../product.module.scss'

function ProductSummary({ shop }) {
  const { price } = shop
  return (
    <div className={styles.informationWrapper}>
      <div className={styles.orderDetails}>
        <div className={styles.textWrapper}>
          <p className={styles.regularText}>
            Subtotal with delivery: <span className={styles.mainAmount}>{`$ ${price}.`}</span>
            <span className={styles.secondaryAmount}>00</span>
          </p>
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.regularText}>
            Delivery: <span className={styles.deliveryType}>STANDART $20</span>
            <span>{'>'}</span>
          </p>
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.regularText}>
            <span className={styles.freeShipping}>$140 more </span>
            <span>for free shipping</span>
          </p>
          <div className={styles.amountLoader}>
            <div className={styles.amountLoaderWidth} style={{ width: '80%' }} />
          </div>
        </div>
      </div>
      <div>
        <p className={styles.policyText}>
          Cancellation policy <span>›</span>
        </p>
      </div>
    </div>
  )
}

export default ProductSummary
