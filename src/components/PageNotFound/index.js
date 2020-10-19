import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import darklogo from 'assets/images/notfound/logo.png'
import desktop from 'routing/PATHS'
import styles from './notfound.module.scss'

const PageNotFound = () => {
  const history = useHistory()
  return (
    <div className={styles.page_not_found}>
      <div className={styles.page_not_found__logo}>
        <Link to={desktop.home}>
          <img src={darklogo} alt="HH" width="50" />
        </Link>
      </div>
      <div className={styles.page_not_found__text}>
        <span className={styles.page_not_found__error}>404</span>
        Page Not found
      </div>
    </div>
  )
}

export default PageNotFound
