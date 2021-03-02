import React from 'react'
import styles from './expInfo.module.scss'

function ExpInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.expInfo}>
        <div className={styles.expInfoData}>
          <div className={styles.info}>
            <div className={styles.option}>Booking Date</div>
            <div className={styles.text}>23 May, 20</div>
          </div>{' '}
          <div className={styles.info}>
            <div className={styles.option}>Time</div>
            <div className={styles.text}>13:20 – 15:40</div>
          </div>{' '}
          <div className={styles.info}>
            <div className={styles.option}>Participants</div>
            <div className={styles.text}>4 - 2</div>
          </div>{' '}
          <div className={styles.info}>
            <div className={styles.option}>Price</div>
            <div className={styles.text}>$ 620</div>
          </div>
        </div>
        <div className={styles.expInvoiceButton}>Share invoice</div>
      </div>
      <div className={styles.rulesContainer}>
        <div className={styles.heading}>Experience rules</div>
        <div className={styles.text}>
          We ask you not to get drunk too much. Do not fight and keep up appearances. Thanks! We ask
          you not to get drunk too much. Do not fight and keep up appearances. We ask you not to get
          drunk too much. Do not fight and keep up appearances. Thanks!
        </div>
      </div>
      <div className={styles.locationContainer}>
        <div className={styles.heading}>Location</div>
        <div className={styles.text}>36 Sin Ming Industrial Est Sector A</div>
      </div>
      <div></div>
      <div></div>
    </div>
  )
}

export default ExpInfo
