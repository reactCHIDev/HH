import React from 'react'
import overviewReviewIcon from 'assets/icons/svg/overview-review.svg'
import styles from './header.module.scss'

function Header() {
  return (
    <div className={styles.container}>
      <img src={overviewReviewIcon} alt="overview-review-icon" />
      <h3>Reviews</h3>
    </div>
  )
}

export default Header
