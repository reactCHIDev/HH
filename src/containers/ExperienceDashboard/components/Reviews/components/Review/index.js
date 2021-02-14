import React from 'react'
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
        <div className={styles.reviewHeader}>
          <div className={styles.expInfo}>
            <div className={styles.expImage} />
            <div className={styles.expTitle}>Cultural Dinner: Art, Music and Fun</div>
          </div>
          <div className={styles.waitingText}>Waiting for reply!</div>
        </div>
        <div className={styles.reviewInfo}>
          <div className={styles.reviewMarks}>1</div>
          <div className={styles.reviewDate}>1</div>
        </div>
        <div className={styles.reviewText}>ads</div>
        <div className={styles.replyButton}>REPLY</div>
      </div>
    </div>
  )
}

export default Review
