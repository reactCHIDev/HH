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
          <div>Sasha</div>
          <div>Visit: {visitedDate}</div>
        </div>
      </div>
      <div className={styles.reviewWrapper}>
        <div className={styles.reviewHeader}>
          <div className={styles.expInfo}>
            <div
              className={styles.expImage}
              style={{ backgroundImage: `url("${el.experience.coverPhoto}")` }}
            />
            <div className={styles.expTitle}>{el.experience.title}</div>
          </div>
          {/* <div className={styles.waitingText}>Waiting for reply!</div> */}
        </div>
        <div className={styles.reviewInfo}>
          <div className={styles.reviewMarks}>
            <div className={styles.rateWrapper}>
              <Rate style={{ color: '#31394C' }} disabled value={4} />
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
        {/* <div className={styles.replyButton}>REPLY</div> */}
      </div>
    </div>
  )
}

export default Review
