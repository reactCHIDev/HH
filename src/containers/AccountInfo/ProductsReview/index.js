import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUnreviewedProductAC, getFlProductReviewsAC, openReviewModal } from 'actions/reviews'
import styles from './productsReview.module.scss'
import ProductToReview from './ProductToReview'
import ReviewModal from './ReviewModal'
import ReviewedProducts from './ReviewedProducts'

function ProductsReview() {
  const dispatch = useDispatch()
  const productToReview = useSelector((state) => state.reviews.unreviewedProduct)
  const reviewedProducts = useSelector((state) => state.reviews.reviews)
  const isReviewModalOpen = useSelector((state) => state.reviews.isModalOpen)
  const currentPage = useSelector((state) => state.reviews.reviewsCurrentPage)

  React.useEffect(() => {
    dispatch(getUnreviewedProductAC(), [dispatch])
    dispatch(getFlProductReviewsAC({ page: currentPage }), [dispatch])
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.container}>
      {productToReview && !isReviewModalOpen && (
        <ProductToReview product={productToReview} openReviewModal={openReviewModal} />
      )}
      {isReviewModalOpen && <ReviewModal product={productToReview} />}
      {reviewedProducts && (
        <ReviewedProducts products={reviewedProducts} currentPage={currentPage} />
      )}
    </div>
  )
}

export default ProductsReview
