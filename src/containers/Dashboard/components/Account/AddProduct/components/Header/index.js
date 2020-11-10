import React from 'react'
import T from 'prop-types'
import styles from './header.module.scss'
import './header.less'

const Header = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <p className={styles.back_arrow}>{'<'}</p>
          <p className={styles.back_title}>Add Product </p>
        </div>
        <p className={styles.saved}>All changes saved</p>
      </div>
    </div>
  )
}

Header.propTypes = {}

export default Header
