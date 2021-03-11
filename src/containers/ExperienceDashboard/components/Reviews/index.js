import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getExperienceReviewAC } from 'actions/experiences-reviews'
import Header from './components/Header'
import Review from './components/Review'
import styles from './reviews.module.scss'

function ReviewsContainer() {
  const dispatch = useDispatch()
  const expReviews = useSelector((state) => state.expReviews.expReviews)
  const id = useSelector((state) => state.account?.shop?.userProfileId)

  React.useEffect(() => {
    dispatch(getExperienceReviewAC({ id, page: 1, type: 'fmExperiencesReview' }))
  }, [])

  return (
    <div className={styles.main_wrapper}>
      <Header />
      <div>{expReviews.length ? expReviews.map((el) => <Review el={el} key={el.id} />) : null}</div>
    </div>
  )
}

export default ReviewsContainer
