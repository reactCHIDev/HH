/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './header.module.scss'

function Header({ shopName, shopUrl }) {
  return (
    <div className={styles.header}>
      <div className={styles.shopTitle}>{shopName}</div>
      <Link to={`shop/${shopUrl?.split('/').pop()}`}>
        <button type="button">VIEW SHOP</button>
      </Link>
    </div>
  )
}

export default Header
