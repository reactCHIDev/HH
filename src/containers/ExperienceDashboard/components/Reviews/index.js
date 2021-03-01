import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getExperienceReviewAC } from 'actions/experiences-reviews'
import Header from './components/Header'
import Review from './components/Review'
import styles from './reviews.module.scss'

function ReviewsContainer() {
  const dispatch = useDispatch()
  const expReviews = useSelector((state) => state.expReviews.expReviews)

  React.useEffect(() => {
    dispatch(getExperienceReviewAC({ page: 1, type: 'fmExperiencesReview' }))
  }, [])

  return (
    <div className={styles.main_wrapper}>
      <Header />
      <div>
        <Review />
      </div>
      {/* {data && data.map((el) => <div key={el.id}>123</div>)} */}
    </div>
  )
}

export default ReviewsContainer
