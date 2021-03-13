/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createExperienceReviewAC } from 'actions/experiences-reviews'
import Uploader from 'components/ReviewUploader'

import { Rate } from 'antd'
import cls from 'classnames'

import styles from './reviewModal.module.scss'
import './reviewModal.less'

function ReviewModal({ experience, setIsReviewModalShown }) {
  const dispatch = useDispatch()

  const [review, setReview] = React.useState('')
  const [enjoymentRating, setGoodRate] = React.useState(5)
  const [knowledgeableRating, setKnowledgeableRate] = React.useState(5)
  const [accuracyRating, setAccuracyRate] = React.useState(5)
  const [valueForMoneyRating, setValueForMoneyRate] = React.useState(5)
  const [accessibilityRating, setAccessibility] = React.useState(5)

  const [recommend, setRecommend] = React.useState(true)

  const [fileList, setFilelist] = useState([])
  const [isActive, setActiveNext] = useState(true)

  const isValid = () => {
    return review.length >= 20
  }

  const submitReview = () => {
    if (isValid()) {
      setIsReviewModalShown(false)
      dispatch(
        createExperienceReviewAC({
          experienceId: experience.id,
          review,
          enjoymentRating,
          valueForMoneyRating,
          accessibilityRating,
          knowledgeableRating,
          accuracyRating,
          recommend,
          isReviewOnProductPage: true,
          photos: fileList.length
            ? fileList
                .filter((e) => e.status !== 'error')
                .map((e) => (e?.response ? e.response.url : e.url))
            : [],
        }),
      )
    } else {
      console.log('error')
    }
  }

  const onChangeReview = (e) => setReview(e.target.value)

  return (
    <div className={styles.wrapper}>
      <div className={styles.closeIcon} onClick={() => setIsReviewModalShown(false)}>
        ✕
      </div>
      <div className={styles.productWrapper}>
        <div
          className={styles.productImage}
          style={{ backgroundImage: `url("${experience.coverPhoto}")` }}
        />
        <div className={styles.productInfo}>
          {/* <div className={styles.pendingText}>Pending review</div> */}
          <div className={styles.productTitle}>{experience.title}</div>
        </div>
      </div>
      <div className={styles.reviewWrapper}>
        <div className={styles.reviewHeader}>Text of review</div>
        <div className={styles.reviewInputWrapper}>
          <textarea
            autoFocus
            className={styles.reviewTextArea}
            onChange={onChangeReview}
            placeholder="The review must be 20 characters or more"
          />
          <div className={styles.imageSection}>
            {/* <div className={styles.addPhotosButton}>Add photos</div> */}
            <Uploader list={fileList} listSet={setFilelist} min={2} setActiveNext={setActiveNext} />
          </div>
        </div>
        <div className={styles.reviewInfo}>
          <div className={styles.rateWrapper}>
            <div className={cls(styles.starsWrapper, 'starsWrapper')}>
              <Rate
                style={{ color: '#31394C' }}
                defaultValue={5}
                onChange={setGoodRate}
                allowClear={false}
              />
              Good
            </div>
            <div className={cls(styles.starsWrapper, 'starsWrapper')}>
              <Rate
                style={{ color: '#31394C' }}
                defaultValue={5}
                onChange={setKnowledgeableRate}
                allowClear={false}
              />
              Knowledgeable
            </div>
            <div className={cls(styles.starsWrapper, 'starsWrapper')}>
              <Rate
                style={{ color: '#31394C' }}
                defaultValue={5}
                onChange={setAccuracyRate}
                allowClear={false}
              />
              Accuracy
            </div>
            <div className={cls(styles.starsWrapper, 'starsWrapper')}>
              <Rate
                style={{ color: '#31394C' }}
                defaultValue={5}
                onChange={setValueForMoneyRate}
                allowClear={false}
              />
              Value for Money
            </div>
            <div className={cls(styles.starsWrapper, 'starsWrapper')}>
              <Rate
                style={{ color: '#31394C' }}
                defaultValue={5}
                onChange={setAccessibility}
                allowClear={false}
              />
              Accessibility
            </div>
          </div>
          <div className={styles.recommendWrapper}>
            <div className={styles.title}>Do you recommend this experience?</div>
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
        <div
          onClick={() => (isValid ? submitReview() : console.log('erorr'))}
          className={isValid() ? styles.submitButton : styles.submitButtonError}
        >
          Publish
        </div>
      </div>
    </div>
  )
}

export default ReviewModal
