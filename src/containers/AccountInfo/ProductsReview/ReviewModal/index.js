import React from 'react'
import { createProductReviewAC } from 'actions/reviews'
import { Rate } from 'antd'

import styles from './reviewModal.module.scss'
import { useDispatch } from 'react-redux'

function ReviewModal({ product }) {
  const dispatch = useDispatch()

  const [review, setReview] = React.useState('')
  const [rating, setRating] = React.useState(5)
  const [recommend, setRecommend] = React.useState(true)
  const submitReview = () => {
    if (isValid()) {
      dispatch(
        createProductReviewAC({
          productId: product.id,
          review,
          rating,
          recommend,
        }),
      )
    } else {
      console.log('error')
    }
  }

  const isValid = () => {
    return review.length >= 20
  }

  const onChangeReview = (e) => setReview(e.target.value)

  return (
    <div className={styles.wrapper}>
      <div className={styles.productWrapper}>
        <div
          className={styles.productImage}
          style={{ backgroundImage: `url("${product?.coverPhoto}")` }}
        />
        <div className={styles.productInfo}>
          <div className={styles.pendingText}>Pending review</div>
          <div className={styles.productTitle}>{product?.title}</div>
        </div>
      </div>
      <div className={styles.reviewWrapper}>
        <div className={styles.reviewHeader}>Text of review</div>
        <div className={styles.reviewInputWrapper}>
          <textarea
            autoFocus={true}
            className={styles.reviewTextArea}
            onChange={onChangeReview}
          ></textarea>
          <div className={styles.imageSection}>
            <div className={styles.addPhotosButton}>Add photos</div>
          </div>
        </div>
        <div className={styles.reviewInfo}>
          <div className={styles.starsWrapper}>
            <Rate
              style={{ color: '#31394C' }}
              defaultValue={5}
              onChange={setRating}
              allowClear={false}
            />
          </div>
          <div className={styles.recommendWrapper}>
            <div className={styles.title}>Do you recommend this product?</div>
            <div
              onClick={() => setRecommend(true)}
              style={recommend ? { textDecoration: 'underline' } : {}}
              className={styles.option}
            >
              Yes
            </div>
            <div
              onClick={() => setRecommend(false)}
              className={styles.option}
              style={recommend ? {} : { textDecoration: 'underline' }}
            >
              No
            </div>
          </div>
        </div>
        <div onClick={() => submitReview()} className={styles.submitButton}>
          Publish
        </div>
      </div>
    </div>
  )
}

export default ReviewModal
