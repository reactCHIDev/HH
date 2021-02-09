import React from 'react'
import styles from './reviewModal.module.scss'

function ReviewModal({ product }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.productWrapper}>
        <div className={styles.productImage}></div>
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
        <div className={styles.submitButton}>Publish</div>
      </div>
    </div>
  )
}

export default ReviewModal
