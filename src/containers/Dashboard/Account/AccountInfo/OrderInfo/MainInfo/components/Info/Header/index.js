import React from 'react'
import styles from './header.module.scss'

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.shopTitle}>Annett’s fairytale shop</div>
      <button type="button">VIEW SHOP</button>
    </div>
  )
}

export default Header
