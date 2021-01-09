import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import darklogo from 'assets/images/notfound/logo.png'
import styles from './notfound.module.scss'

const PageNotFound = ({ msg }) => {
  const history = useHistory()
  return (
    <div className={styles.page_not_found}>
      <div className={styles.page_not_found__logo}>
        <Link to="/">
          <img src={darklogo} alt="HH" width="50" />
        </Link>
      </div>
      <div className={styles.page_not_found__text}>
        <span className={styles.page_not_found__error}>404</span>
        {msg || 'Page Not Found'}
      </div>
    </div>
  )
}

export default PageNotFound
