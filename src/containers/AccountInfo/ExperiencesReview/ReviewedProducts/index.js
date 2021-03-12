/* eslint-disable react/prop-types */
import React from 'react'
import { Rate } from 'antd'
import cls from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import people from 'assets/icons/svg/people.svg'
import { getFLExperienceReviewsAC } from 'actions/experiences-reviews'
import ListContainer from 'components/ListContainer'
import styles from './reviewedProducts.module.scss'
import './review.less'

function ReviewdProducts({ products, currentPage }) {
  const reviewsCount = useSelector((state) => state.expReviews.count)
  const dispatch = useDispatch()

  const getDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })

  const pageChange = (newPage) => {
    dispatch(getFLExperienceReviewsAC({ page: newPage }))
  }
  return (
    <ListContainer page={currentPage} pageChange={pageChange} pageSize={3} total={reviewsCount}>
      {products.map((item) => (
        <div className={styles.wrapper} key={item.id}>
          <div className={styles.expWrapper}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                className={styles.imgWrapper}
                style={{ backgroundImage: `url("${item.experience.coverPhoto}")` }}
              />
              <div className={styles.titleWrapper}>{item.experience.title}</div>
            </div>
          </div>
          <div className={styles.reviewWrapper}>
            <div className={styles.reviewInfoWrapper}>
              <div className={styles.reviewPeople}>
                <img src={people} alt="avatar" className={styles.adult} />
                {item.guests?.adults || 0}
                <img src={people} alt="avatar" className={styles.child} />
                {item.guests?.childs || 0}
              </div>
              <div className={styles.reviewDate}>{getDate(item.createdAt)}</div>
            </div>
            <div className={styles.reviewText}>{item.review}</div>
            <div className={styles.reviewData}>
              <div className={styles.imgContainer}>
                {item.photos.length > 0 &&
                  item.photos.map((el) => (
                    <div key={item} style={{ backgroundImage: `url("${el}")` }} />
                  ))}
                {/* <div /> */}
              </div>
              <div className={styles.ratesContainer}>
                <div className={cls(styles.reviewRate, 'reviewRate')}>
                  <Rate
                    style={{ color: '#31394C' }}
                    value={item.ratingDetails.enjoymentRating}
                    disabled
                  />
                  <p>Enjoyment</p>
                </div>
                <div className={cls(styles.reviewRate, 'reviewRate')}>
                  <Rate
                    style={{ color: '#31394C' }}
                    value={item.ratingDetails.knowledgeableRating}
                    disabled
                  />
                  <p>Knowledgeable</p>
                </div>
                <div className={cls(styles.reviewRate, 'reviewRate')}>
                  <Rate
                    style={{ color: '#31394C' }}
                    value={item.ratingDetails.accuracyRating}
                    disabled
                  />
                  <p>Accuracy</p>
                </div>
                <div className={cls(styles.reviewRate, 'reviewRate')}>
                  <Rate
                    style={{ color: '#31394C' }}
                    value={item.ratingDetails.valueForMoneyRating}
                    disabled
                  />
                  <p>Value for Money</p>
                </div>
                <div className={cls(styles.reviewRate, 'reviewRate')}>
                  <Rate
                    style={{ color: '#31394C' }}
                    value={item.ratingDetails.accessibilityRating}
                    disabled
                  />
                  <p>Accessibility</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </ListContainer>
  )
}

export default ReviewdProducts
