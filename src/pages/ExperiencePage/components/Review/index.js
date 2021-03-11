/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getExperienceReviewAC } from 'actions/experiences-reviews'

import ReviewWrapper from './components/Review'
import Header from './components/Header'
import ReviewsStats from './components/ReviewsStats'
import ReviewModal from './components/ReviewModal'

import styles from './review.module.scss'

function Review({ id, experience }) {
  const dispatch = useDispatch()
  const expReviews = useSelector((state) => state.expReviews.expReviews)
  const isUserCanReview = !experience.isReviewed

  const [isReviewModalShown, setIsReviewModalShown] = React.useState(false)

  React.useEffect(() => {
    dispatch(getExperienceReviewAC({ page: 1, type: 'experienceReviews', id }))
  }, [])

  return (
    <div className={styles.container}>
      <Header />
      <ReviewsStats
        mainRate={experience.rating || 0}
        votes={experience.votes || 0}
        enjoymentRate={experience.ratingDetails.enjoymentRating || 0}
        accesibilityRate={experience.ratingDetails.accessibilityRating || 0}
        accuracyRate={experience.ratingDetails.accuracyRating || 0}
        knowledgeableRate={experience.ratingDetails.knowledgeableRating || 0}
        valueForMoneyRate={experience.ratingDetails.valueForMoneyRating || 0}
      />
      {isReviewModalShown && (
        <ReviewModal experience={experience} setIsReviewModalShown={setIsReviewModalShown} />
      )}
      {isUserCanReview && !isReviewModalShown && (
        <div className={styles.openReviewButton}>
          <div
            onClick={() => {
              setIsReviewModalShown((b) => !b)
            }}
          >
            Add Review
          </div>
        </div>
      )}
      {expReviews.length ? expReviews.map((el) => <ReviewWrapper el={el} />) : null}
    </div>
  )
}

export default Review
