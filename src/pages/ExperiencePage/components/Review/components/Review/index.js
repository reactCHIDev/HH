/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Rate } from 'antd'
import people from 'assets/icons/svg/people.svg'

import styles from './review.module.scss'

function Review({ el }) {
  return (
    <div className={styles.wrapper} key={el.id}>
      <div className={styles.clientWrapper}>
        <div
          className={styles.clientAvatar}
          style={{ backgroundImage: `url("${el.customer.userPhoto}")` }}
        />
        <div className={styles.clientInfo}>
          <div>{el.customer.profileName}</div>
          <div>Visit: 12 May, 20</div>
        </div>
      </div>
      <div className={styles.reviewWrapper}>
        <div className={styles.reviewInfo}>
          <div className={styles.reviewMarks}>
            <div className={styles.rateWrapper}>
              <Rate style={{ color: '#31394C' }} disabled value={el.avgRating} />
            </div>
            <div className={styles.reads}>
              <div className={styles.reads_people}>
                <img src={people} alt="avatar" />
              </div>
              <div className={styles.qty_reads}>4</div>
            </div>
          </div>
          <div className={styles.reviewDate}>22 May</div>
        </div>
        <div className={styles.reviewText}>{el.review}</div>
        {/* <div className={styles.replyButton}>REPLY</div> */}
      </div>
    </div>
  )
}

export default Review
