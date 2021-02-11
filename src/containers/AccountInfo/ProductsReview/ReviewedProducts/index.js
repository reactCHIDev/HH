import React from 'react'
import { Rate } from 'antd'
import cls from 'classnames'

import styles from './reviewedProducts.module.scss'
import './review.less'

function ReviewdProducts({ products }) {
  const recommendText = `You recommend this product`
  const dontRecommendText = `You don't recommend this product`

  const getDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })

  return products.map((item) => (
    <div className={styles.wrapper} key={item.id}>
      <div className={styles.productWrapper}>
        <div
          className={styles.productImage}
          style={{ backgroundImage: `url("${item.orderProduct.coverPhoto}")` }}
        />
        <div className={styles.productTitle}>{item.orderProduct.title}</div>
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
            <div className={cls(styles.reviewRate, 'reviewRate')}>
              <Rate style={{ color: '#31394C' }} value={item.rating} disabled />
            </div>
          </div>
          <div className={styles.reviewDate}>{getDate(item.createdAt)}</div>
        </div>
        <div className={styles.reviewText}>{item.review}</div>
        <div className={styles.reviewPhotosWrapper}></div>
      </div>
    </div>
  ))
}

export default ReviewdProducts
