import React from 'react'
import styles from './expInfo.module.scss'

function ExpInfo({ date, adults, childs, price, invoiceUrl }) {
  const day = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  })

  const time = new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: false,
    minute: '2-digit',
  })
  return (
    <div className={styles.container}>
      <div className={styles.expInfo}>
        <div className={styles.expInfoData}>
          <div className={styles.info}>
            <div className={styles.option}>Booking Date</div>
            <div className={styles.text}>{day}</div>
          </div>{' '}
          <div className={styles.info}>
            <div className={styles.option}>Time</div>
            <div className={styles.text}>{time}</div>
          </div>{' '}
          <div className={styles.info}>
            <div className={styles.option}>Participants</div>
            <div className={styles.text}>
              {`${adults}a` || ''} -{`${childs}c` || ''}{' '}
            </div>
          </div>{' '}
          <div className={styles.info}>
            <div className={styles.option}>Price</div>
            <div className={styles.text}>$ {price}</div>
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
