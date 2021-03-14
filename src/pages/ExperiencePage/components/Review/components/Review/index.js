/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Rate } from 'antd'
import people from 'assets/icons/svg/people.svg'

import styles from './review.module.scss'

function Review({ el }) {
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  const mainDate = new Date(el.createdAt).toLocaleDateString('en-US', dateOptions)
  const visitedDate = new Date(el.visitedAt).toLocaleDateString('en-US', dateOptions)
  return (
    <div className={styles.wrapper}>
      <div className={styles.clientWrapper}>
        <div
          className={styles.clientAvatar}
          style={{ backgroundImage: `url("${el.customer.userPhoto}")` }}
        />
        <div className={styles.clientInfo}>
          <div>{el.customer.profileName}</div>
          <div>Visit: {visitedDate}</div>
        </div>
      </div>
      <div className={styles.reviewWrapper}>
        <div className={styles.reviewInfo}>
          <div className={styles.reviewMarks}>
            <div className={styles.rateWrapper}>
              <Rate style={{ color: '#31394C' }} disabled value={el.avgRating} />
            </div>
            <div className={styles.reads}>
              <img src={people} alt="avatar" className={styles.adult} />
              {el.guests?.adults || 0}
              <img src={people} alt="avatar" className={styles.child} />
              {el.guests?.childs || 0}
            </div>
          </div>
          <div className={styles.reviewDate}>{mainDate}</div>
        </div>
        <div className={styles.reviewText}>{el.review}</div>
        {/* <div>11</div> */}
        <div className={styles.imgContainer}>
          {el.photos.length > 0 &&
            el.photos.map((i) => <div key={i} style={{ backgroundImage: `url("${i}")` }} />)}
          {/* <div /> */}
        </div>
        {/* <div className={styles.replyButton}>REPLY</div> */}
      </div>
    </div>
  )
}

export default Review
