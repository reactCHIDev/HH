/* eslint-disable react/prop-types */
import React from 'react'
import styles from './mainInfo.module.scss'

function MainInfo({ orderInfo }) {
  console.log(orderInfo)

  const day = new Date(orderInfo.booking.time).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    // year: '2-digit',
  })

  const time = new Date(orderInfo.booking.time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: false,
    minute: '2-digit',
  })
  return (
    <div className={styles.container}>
      <div className={styles.mainInfo}>
        <div
          className={styles.imgWrapper}
          style={{ backgroundImage: `url("${orderInfo.experience.coverPhoto}")` }}
        />
        <div className={styles.expWrapper}>
          <div className={styles.title}>{orderInfo.experience.title}</div>
          <div className={styles.additionalInfo}>
            <div className={styles.section}>
              <div className={styles.heading}>Ref. Nº</div>
              <div className={styles.item}>{orderInfo.booking.id}</div>
            </div>
            <div className={styles.section}>
              <div className={styles.heading}>Day</div>
              <div className={styles.item}>{day}</div>
            </div>
            <div className={styles.section}>
              <div className={styles.heading}>Time</div>
              <div className={styles.item}>{time}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.detailsInfo}>
        <div className={styles.ticketsInfo}>
          <div className={styles.section}>
            <div className={styles.heading}>Tickets:</div>
            {orderInfo.booking.guests?.adults && (
              <div className={styles.item}>Adults – $200 (x{orderInfo.booking.guests?.adults})</div>
            )}
            {orderInfo.booking.guests?.childs && (
              <div className={styles.item}>Childs – $140 (x{orderInfo.booking.guests?.childs})</div>
            )}
          </div>
          <div className={styles.section}>
            <div className={styles.heading}>Payment method:</div>
            <div className={styles.item}>VISA – Credit card</div>
          </div>
        </div>
        <div className={styles.discounInfo}>10% discount</div>
        <div className={styles.totalInfo}>Total: ${orderInfo.booking.totalPrice}</div>
      </div>
      {/* <div className={styles.guestsInfo}> - </div> */}
    </div>
  )
}

export default MainInfo
