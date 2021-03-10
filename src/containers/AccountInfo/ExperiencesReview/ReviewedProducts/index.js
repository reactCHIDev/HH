/* eslint-disable react/prop-types */
import React from 'react'
import { Rate } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
// import { getUnreviewedProductAC, getFlProductReviewsAC, openReviewModal } from 'actions/reviews'
import { getUnreviewedExperienceAC, getFLExperienceReviewsAC } from 'actions/experiences-reviews'

import cls from 'classnames'
import ListContainer from 'components/ListContainer'

import styles from './reviewedProducts.module.scss'
import './review.less'

function ReviewdProducts({ products, currentPage }) {
  const reviewsCount = useSelector((state) => state.expReviews.count)

  const recommendText = `You recommend this product`
  const dontRecommendText = `You don't recommend this product`
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
          <div className={styles.productWrapper}>
            <div
              className={styles.productImage}
              style={{ backgroundImage: `url("${item.experience.coverPhoto}")` }}
            />
            <div className={styles.productTitle}>{item.experience.title}</div>
          </div>
          <div className={styles.reviewWrapper}>
            <div className={styles.reviewInfo}>
              <div className={styles.reviewDataWrapper}>
                <div
                  className={styles.reviewRecommend}
                  style={{ color: item.recommend ? '#7AD398' : '#EB5769' }}
                >
                  {item.recommend ? recommendText : dontRecommendText}
                </div>
              </div>
              <div className={styles.reviewDate}>{getDate(item.createdAt)}</div>
            </div>
            <div className={styles.reviewText}>{item.review}</div>
            <div className={styles.imageContainer}>
              <div className={styles.reviewPhotosWrapper}>
                {/* {item.photos.length > 0 &&
                  item.photos.map((el) => (
                    <div
                      key={item}
                      style={{ backgroundImage: `url("${el}")` }}
                      className={styles.imgWrapper}
                    />
                  ))} */}
                <div key={item} style={{ color: `red` }} className={styles.imgWrapper} />
                <div />
              </div>
              <div className={cls(styles.reviewRate, 'reviewRate')}>
                <Rate style={{ color: '#31394C' }} value={item.rating} disabled />
              </div>
            </div>
          </div>
        </div>
      ))}
    </ListContainer>
  )
}

export default ReviewdProducts
