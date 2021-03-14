import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getFlProductReviewsAC, openReviewModal } from 'actions/reviews'
import {
  getUnreviewedExperienceAC,
  getFLExperienceReviewsAC,
  openReviewModal,
} from 'actions/experiences-reviews'

import styles from './productsReview.module.scss'
import ProductToReview from './ProductToReview'
import ReviewModal from './ReviewModal'
import ReviewedProducts from './ReviewedProducts'

function ProductsReview() {
  const dispatch = useDispatch()
  const experienceToReview = useSelector((state) => state.expReviews.unreviewedExperience)
  const reviewedProducts = useSelector((state) => state.expReviews.reviews)
  const isReviewModalOpen = useSelector((state) => state.expReviews.isModalOpen)
  const currentPage = useSelector((state) => state.expReviews.reviewsCurrentPage)
  const reviewsCount = useSelector((state) => state.expReviews.count)

  React.useEffect(() => {
    dispatch(getUnreviewedExperienceAC(), [dispatch])
    dispatch(getFLExperienceReviewsAC({ page: currentPage }), [dispatch])
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.container}>
      {experienceToReview && !isReviewModalOpen && (
        <ProductToReview experience={experienceToReview} openReviewModal={openReviewModal} />
      )}
      {isReviewModalOpen && <ReviewModal experience={experienceToReview} />}
      {reviewedProducts && (
        <ReviewedProducts
          products={reviewedProducts}
          currentPage={currentPage}
          reviewsCount={reviewsCount}
        />
      )}
    </div>
  )
}

export default ProductsReview
