import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFlProductReviewsAC, openReviewModal } from 'actions/reviews'
import { getUnreviewedExperienceAC } from 'actions/experiences-reviews'

import styles from './productsReview.module.scss'
import ProductToReview from './ProductToReview'
import ReviewModal from './ReviewModal'
import ReviewedProducts from './ReviewedProducts'

function ProductsReview() {
  const dispatch = useDispatch()
  const experienceToReview = useSelector((state) => state.expReviews.unreviewedExperience)
  const reviewedProducts = useSelector((state) => state.reviews.reviews)
  const isReviewModalOpen = useSelector((state) => state.reviews.isModalOpen)
  const currentPage = useSelector((state) => state.reviews.reviewsCurrentPage)

  React.useEffect(() => {
    dispatch(getUnreviewedExperienceAC(), [dispatch])
    dispatch(getFlProductReviewsAC({ page: currentPage }), [dispatch])
  }, [])
  console.log(experienceToReview, 'experienceToReview')
  return (
    <div className={styles.container}>
      {experienceToReview && !isReviewModalOpen && (
        <ProductToReview experience={experienceToReview} openReviewModal={openReviewModal} />
      )}
      {isReviewModalOpen && <ReviewModal experience={experienceToReview} />}
      {/* 
      {reviewedProducts && (
        <ReviewedProducts products={reviewedProducts} currentPage={currentPage} />
      )} */}
    </div>
  )
}

export default ProductsReview
