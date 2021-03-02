import React from 'react'
import styles from './makerInfo.module.scss'
import MakerWrapper from '../MakerWrapper'

function MakerInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.textInfo}>
        <div className={styles.info}>
          <div className={styles.option}>Delivery</div>
          <div className={styles.id}>lol</div>
        </div>
        <div className={styles.info}>
          <div className={styles.option}>Delivery</div>
          <div className={styles.text}>lol</div>
        </div>
      </div>
      <div className={styles.makerInfo}>
        <MakerWrapper />
      </div>
      <div className={styles.expPageButton}>
        <div>Go to the Experience page</div>
      </div>
      <div className={styles.btnSection}>
        <div className={styles.leaveBtn}>Leave a review</div>
        <div className={styles.printBtn}>Print</div>
      </div>
    </div>
  )
}

export default MakerInfo
