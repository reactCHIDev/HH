import React from 'react'
import { createProductReviewAC } from 'actions/reviews'

import styles from './reviewModal.module.scss'
import { useDispatch } from 'react-redux'

function ReviewModal({ product }) {
  const dispatch = useDispatch()
  const submitReview = () => {
    dispatch(
      createProductReviewAC({
        productId: product.id,
        review: 'texttexttexttexttext',
        rating: 4,
        recommend: true,
      }),
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.productWrapper}>
        <div
          className={styles.productImage}
          style={{ backgroundImage: `url("${product.coverPhoto}")` }}
        />
        <div className={styles.productInfo}>
          <div className={styles.pendingText}>Pending review</div>
          <div className={styles.productTitle}>{product.title}</div>
        </div>
      </div>
      <div className={styles.reviewWrapper}>
        <div className={styles.reviewHeader}>Text of review</div>
        <div className={styles.reviewInputWrapper}>
          <textarea autoFocus={true} className={styles.reviewTextArea}></textarea>
          <div className={styles.imageSection}>
            <div className={styles.addPhotosButton}>Add photos</div>
          </div>
        </div>
        <div className={styles.reviewInfo}>
          <div className={styles.starsWrapper}></div>
          <div className={styles.recommendWrapper}></div>
        </div>
        <div onClick={() => submitReview()} className={styles.submitButton}>
          Publish
        </div>
      </div>
    </div>
  )
}

export default ReviewModal
