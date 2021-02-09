import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUnreviewedProductAC } from 'actions/reviews'
import styles from './productsReview.module.scss'
import ProductToReview from './ProductToReview'
import ReviewModal from './ReviewModal'

function ProductsReview() {
  const dispatch = useDispatch()
  const productToReview = useSelector((state) => state.reviews.unreviewedProduct)

  const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false)

  React.useEffect(() => {
    dispatch(getUnreviewedProductAC())
  }, [])

  return (
    <div className={styles.container}>
      {productToReview && !isReviewModalOpen && (
        <ProductToReview product={productToReview} setIsReviewModalOpen={setIsReviewModalOpen} />
      )}
      {isReviewModalOpen && <ReviewModal product={productToReview} />}
      <div></div>
    </div>
  )
}

export default ProductsReview
