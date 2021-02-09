import React from 'react'
import styles from './productsReview.module.scss'
import ProductToReview from './ProductToReview'
import ReviewModal from './ReviewModal'

const product = {
  title: 'Pie with carrots, apple and cinnamon',
  img: 'green',
}

function ProducrsReview() {
  const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false)
  return (
    <div className={styles.container}>
      {product && !isReviewModalOpen && (
        <ProductToReview product={product} setIsReviewModalOpen={setIsReviewModalOpen} />
      )}
      {isReviewModalOpen && <ReviewModal product={product} />}
      <div></div>
    </div>
  )
}

export default ProducrsReview
