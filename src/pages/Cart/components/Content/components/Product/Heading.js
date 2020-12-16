import React from 'react'
import styles from './product.module.scss'

function Heading() {
  return (
    <div className={styles.headingWrapper}>
      <div className={styles.shopName}>Lol</div>
      <button type="button" className={styles.shopButton}>
        VIEW SHOP
      </button>
    </div>
  )
}

export default Heading
