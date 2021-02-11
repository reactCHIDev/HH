import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './productToReview.module.scss'

function ProductToReview({ product, setIsReviewModalOpen, openReviewModal }) {
  const dispatch = useDispatch()
  const openModal = () => {
    dispatch(openReviewModal())
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.productWrapper}>
        <div
          style={{ backgroundImage: `url("${product.coverPhoto}")` }}
          className={styles.productImage}
        />
        <div className={styles.productInfo}>
          <div className={styles.pendingText}>pending review</div>
          <div className={styles.productTitle}>{product.title}</div>
        </div>
      </div>
      <div
        onClick={() => {
          openModal()
        }}
        className={styles.button}
      >
        Leave a review
      </div>
    </div>
  )
}

export default ProductToReview
