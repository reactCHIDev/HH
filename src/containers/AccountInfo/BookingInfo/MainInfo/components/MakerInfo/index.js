/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './makerInfo.module.scss'
import MakerWrapper from '../MakerWrapper'

function MakerInfo({ bookingID, date, foodmaker, expId }) {
  const day = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  const time = new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: false,
    minute: '2-digit',
  })
  return (
    <div className={styles.container}>
      <div className={styles.textInfo}>
        <div className={styles.info}>
          <div className={styles.option}>Booking ID</div>
          <div className={styles.id}>#{bookingID}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.option}>Date/time</div>
          <div className={styles.text}>
            {day} {time}
          </div>
        </div>
      </div>
      <div className={styles.makerInfo}>
        <MakerWrapper foodmaker={foodmaker} />
      </div>
      <div className={styles.expPageButton}>
        <Link style={{ color: 'white' }} to={`/experience/${expId}`}>
          Go to the Experience page
        </Link>
      </div>
      <div className={styles.btnSection}>
        {/* <div className={styles.leaveBtn}>Leave a review</div> */}
        {/* <div className={styles.printBtn}>Print</div> */}
      </div>
    </div>
  )
}

export default MakerInfo
