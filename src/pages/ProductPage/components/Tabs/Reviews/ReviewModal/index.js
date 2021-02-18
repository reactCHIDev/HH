import React from 'react'
import { Rate } from 'antd'
import cls from 'classnames'
import { useDispatch } from 'react-redux'

import useClickOutside from 'hooks/useClickOutside'
import { createProductReviewAC } from 'actions/reviews'

import styles from './reviewModal.module.scss'

function ReviewModal({ closeFunc, productId }) {
  const [review, setReview] = React.useState('')
  const [rating, setRating] = React.useState(5)
  const [recommend, setRecommend] = React.useState(true)

  const dispatch = useDispatch()

  const modalRef = React.useRef()
  useClickOutside(modalRef, closeFunc)

  const submitReview = () => {
    dispatch(
      createProductReviewAC({
        productId: productId,
        review,
        rating,
        recommend,
        isReviewOnProductPage: true,
      }),
    )
    closeFunc()
  }

  const isValid = () => {
    return review.length >= 20
  }

  const onChangeReview = (e) => setReview(e.target.value)

  return (
    <div className={styles.container} ref={modalRef}>
      <div className={styles.reviewHeader}>
        <div>Text of review</div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            closeFunc()
            console.log(1)
          }}
        >
          &#10005;
        </div>
      </div>
      <div className={styles.reviewInputWrapper}>
        <textarea
          autoFocus={true}
          className={styles.reviewTextArea}
          onChange={onChangeReview}
          placeholder="The review must be 20 characters or more"
        ></textarea>
      </div>
      <div className={styles.reviewInfo}>
        <div className={cls(styles.starsWrapper, 'starsWrapper')}>
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
      <div className={styles.imageSection}>
        <div className={styles.addPhotosButton}>Add photos</div>
      </div>
      <div
        onClick={() => (isValid ? submitReview() : console.log('errror'))}
        className={isValid() ? styles.submitButton : styles.submitButtonError}
      >
        Publish
      </div>
    </div>
  )
}

export default ReviewModal
