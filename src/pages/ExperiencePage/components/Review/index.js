import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getExperienceReviewAC } from 'actions/experiences-reviews'

import ReviewWrapper from './components/Review'
import Header from './components/Header'
import ReviewsStats from './components/ReviewsStats'

import styles from './review.module.scss'

function Review({ id }) {
  const dispatch = useDispatch()
  const expReviews = useSelector((state) => state.expReviews.expReviews)

  React.useEffect(() => {
    dispatch(getExperienceReviewAC({ page: 1, type: 'experienceReviews', id }))
  }, [])

  return (
    <div className={styles.container}>
      <Header />
      <ReviewsStats />
      <ReviewWrapper />
    </div>
  )
}

export default Review
