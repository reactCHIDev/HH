import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReviewsForProductAC } from 'actions/reviews'
import Header from './components/Header'
import ReviewedProducts from './components/ReviewedProducts'
import styles from './reviews.module.scss'

function ReviewsContainer() {
  const dispatch = useDispatch()
  const prodReviews = useSelector((state) => state.prodReviews.reviews)
  const currentPage = useSelector((state) => state.prodReviews.currentProductPage)

  React.useEffect(() => {
    dispatch(getReviewsForProductAC({ page: currentPage }))
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.main_wrapper}>
      <Header />
      <div>
        <ReviewedProducts products={prodReviews} currentPage={currentPage} />
      </div>
    </div>
  )
}

export default ReviewsContainer
