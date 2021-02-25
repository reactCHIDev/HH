import React from 'react'
import ReviewWrapper from './components/Review'
import Header from './components/Header'
import ReviewsStats from './components/ReviewsStats'
import styles from './review.module.scss'

function Review() {
  return (
    <div className={styles.container}>
      <Header />
      <ReviewsStats />
      <ReviewWrapper />
    </div>
  )
}

export default Review
