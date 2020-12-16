import React from 'react'
import styles from './heading.module.scss'

function Heading() {
  return (
    <div className={styles.container}>
      <div className={styles.routeTextContainer}>
        <p className={styles.mainText}>Home</p>
        <span className={styles.arrow}>›</span>
        <p className={styles.secondaryText}>My cart</p>
      </div>
      <div>
        <h1 className={styles.heading}>My cart</h1>
      </div>
    </div>
  )
}

export default Heading
