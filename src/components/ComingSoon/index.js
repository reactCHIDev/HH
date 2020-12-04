import React from 'react'
import comingsoon from 'assets/images/comingsoon.png'
import styles from './soon.module.scss'

const PageNotFound = () => {
  return (
    <div className={styles.page_not_found}>
      <div className={styles.page_not_found__logo}>
        <img className={styles.img} src={comingsoon} alt="HH" width="50" />
      </div>
    </div>
  )
}

export default PageNotFound
