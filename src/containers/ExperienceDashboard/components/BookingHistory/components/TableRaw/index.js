/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './tableRaw.module.scss'

function TableRaw({ element }) {
  const day = new Date(element.time).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  })

  const time = new Date(element.time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: false,
    minute: '2-digit',
  })
  return (
    <div className={styles.container}>
      <div className={styles.mainInfo}>
        <div style={{ backgroundImage: `url("${element.photo}")` }} className={styles.imgWrapper} />
        <div>{element.title}</div>
      </div>
      <div className={styles.secondaryInfo}>
        <div className={styles.day}>{day}</div>
        <div className={styles.time}>{time}</div>
        <div className={styles.price}>{element.price}$</div>
        <div className={styles.guests}>{element.guests}</div>
        <div className={styles.button}>
          <Link to={{ pathname: '/fm_booking_info', state: element.id }}>
            <button type="button">view</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TableRaw
