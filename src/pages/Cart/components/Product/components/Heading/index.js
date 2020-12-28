/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../../product.module.scss'

function Heading({ shop }) {
  const { shopUrl, title } = shop
  return (
    <div className={styles.headingWrapper}>
      <div className={styles.shopName}>
        <p>{title}</p>
      </div>
      <Link to={`shop/${shopUrl.split('/').pop()}`}>
        <button type="button" className={styles.shopButton}>
          VIEW SHOP
        </button>
      </Link>
    </div>
  )
}

export default Heading
