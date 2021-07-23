/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react'
import { Rate } from 'antd'
import cls from 'classnames'
import { useDispatch } from 'react-redux'
import Uploader from 'components/ReviewUploader'

import { createProductReviewAC } from 'actions/reviews'

import styles from './reviewModal.module.scss'

function ReviewModal({ closeFunc, productId }) {
  const [review, setReview] = React.useState('')
  const [rating, setRating] = React.useState(5)
  const [recommend, setRecommend] = React.useState(true)

  const [fileList, setFilelist] = React.useState([])
  // eslint-disable-next-line no-unused-vars
  const [isActive, setActiveNext] = React.useState(true)

  const dispatch = useDispatch()

  const modalRef = React.useRef()
  // useClickOutside(modalRef, closeFunc)

  const submitReview = () => {
    dispatch(
      createProductReviewAC({
        productId,
        review,
        rating,
        recommend,
        isReviewOnProductPage: true,
        photos: fileList.length
          ? fileList
              .filter((e) => e.status !== 'error')
              .map((e) => (e?.response ? e.response.url : e.url))
          : [],
      }),
    )
    closeFunc()
  }

  const isValid = () => {
    return review.length >= 5
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
          }}
        >
          &#10005;
        </div>
      </div>
      <div className={styles.reviewInputWrapper}>
        <textarea
          autoFocus
          className={styles.reviewTextArea}
          onChange={onChangeReview}
          placeholder="The review must be 5 characters or more"
        />
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
        <Uploader list={fileList} listSet={setFilelist} min={2} setActiveNext={setActiveNext} />
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
