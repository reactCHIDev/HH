import React from 'react'
import styles from './mainInfo.module.scss'

function MainInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.mainInfo}>
        <div className={styles.imgWrapper} />
        <div className={styles.expWrapper}>
          <div className={styles.title}>Boring Indian Curry Workshop</div>
          <div className={styles.additionalInfo}>
            <div className={styles.section}>
              <div className={styles.heading}>Ref. Nº</div>
              <div className={styles.item}>395429</div>
            </div>
            <div className={styles.section}>
              <div className={styles.heading}>Day</div>
              <div className={styles.item}>23 May</div>
            </div>
            <div className={styles.section}>
              <div className={styles.heading}>Time</div>
              <div className={styles.item}>13:20</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.detailsInfo}>
        <div className={styles.ticketsInfo}>
          <div className={styles.section}>
            <div className={styles.heading}>Tickets:</div>
            <div className={styles.item}>Adults – $200 (x4)</div>
            <div className={styles.item}>Childs – $140 (x2)</div>
          </div>
          <div className={styles.section}>
            <div className={styles.heading}>Payment method:</div>
            <div className={styles.item}>VISA – Credit card</div>
          </div>
        </div>
        <div className={styles.discounInfo}>10% discount</div>
        <div className={styles.totalInfo}>Total: $80.40</div>
      </div>
      {/* <div className={styles.guestsInfo}> - </div> */}
    </div>
  )
}

export default MainInfo
