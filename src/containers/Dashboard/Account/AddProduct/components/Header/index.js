import React from 'react'
import { Link } from 'react-router-dom'
import { removeKey } from 'utils/localStorage'

import T from 'prop-types'
import styles from './header.module.scss'
import './header.less'

const Header = (props) => {
  const goBack = () => {
    removeKey('addProduct')
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <Link to="/profile" onClick={goBack}>
            <p className={styles.back_arrow}>{'<'}</p>
          </Link>
          <p className={styles.back_title}>Add Product </p>
        </div>
        <p className={styles.saved}>All changes saved</p>
      </div>
    </div>
  )
}

Header.propTypes = {}

export default Header
