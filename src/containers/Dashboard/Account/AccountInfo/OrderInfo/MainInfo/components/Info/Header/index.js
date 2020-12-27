/* eslint-disable react/prop-types */
import React from 'react'
import styles from './header.module.scss'

function Header({ shopName }) {
  return (
    <div className={styles.header}>
      <div className={styles.shopTitle}>{shopName}</div>
      <button type="button">VIEW SHOP</button>
    </div>
  )
}

export default Header
