import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUnreviewedProductAC, getFlProductReviewsAC } from 'actions/reviews'
import styles from './productsReview.module.scss'
import ProductToReview from './ProductToReview'
import ReviewModal from './ReviewModal'
import ReviewedProducts from './ReviewedProducts'

function ProductsReview() {
  const dispatch = useDispatch()
  const productToReview = useSelector((state) => state.reviews.unreviewedProduct)
  const reviewedProducts = useSelector((state) => state.reviews.reviews)

  const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false)

  React.useEffect(() => {
    dispatch(getUnreviewedProductAC())
    dispatch(getFlProductReviewsAC(), [dispatch])
  }, [])

  return (
    <div className={styles.container}>
      {productToReview && !isReviewModalOpen && (
        <ProductToReview product={productToReview} setIsReviewModalOpen={setIsReviewModalOpen} />
      )}
      {isReviewModalOpen && <ReviewModal product={productToReview} />}
      {reviewedProducts && <ReviewedProducts products={reviewedProducts} />}
      <div></div>
    </div>
  )
}

export default ProductsReview
