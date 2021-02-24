import React from 'react'
import styles from './reviewsStats.module.scss'
import MainRate from './MainRate'
import SecondaryRate from './SecondaryRate'

function ReviewsStats() {
  return (
    <div className={styles.container}>
      <MainRate />
      <SecondaryRate />
    </div>
  )
}

export default ReviewsStats
