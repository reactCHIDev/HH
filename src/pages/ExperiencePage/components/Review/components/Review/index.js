import React from 'react'
import { Rate } from 'antd'
import people from 'assets/icons/svg/people.svg'

import styles from './review.module.scss'

function Review() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.clientWrapper}>
        <div className={styles.clientAvatar} />
        <div className={styles.clientInfo}>
          <div>Sasha</div>
          <div>Visit: 12 May, 20</div>
        </div>
      </div>
      <div className={styles.reviewWrapper}>
        <div className={styles.reviewInfo}>
          <div className={styles.reviewMarks}>
            <div className={styles.rateWrapper}>
              <Rate style={{ color: '#31394C' }} disabled value={4} />
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
        <div className={styles.reviewText}>
          Super cool gin program they have going here. All the different infusions are super
          interesting. Сocktails, was a great time. Super cool gin program they have going here. All
          the different infusions are super interesting. Got to make some cocktails, was a great
          time.
        </div>
        {/* <div className={styles.replyButton}>REPLY</div> */}
      </div>
    </div>
  )
}

export default Review
