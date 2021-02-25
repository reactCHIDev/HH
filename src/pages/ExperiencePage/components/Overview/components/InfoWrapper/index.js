import React from 'react'
import financeIcon from 'assets/icons/svg/overview-finance.svg'
import cityIcon from 'assets/icons/svg/overview-city.svg'
import peopleVisitedIcon from 'assets/icons/svg/overview-people-visited.svg'
import timeIcon from 'assets/icons/svg/overview-time.svg'
import guestsIcon from 'assets/icons/svg/overview-guests.svg'
import langIcon from 'assets/icons/svg/overview-lang.svg'

import styles from './infoWrapper.module.scss'

function InfoWrapper() {
  return (
    <div className={styles.infoWrapper}>
      <div className={styles.infoRow}>
        <div className={styles.infoElement}>
          <img className={styles.infoIcon} src={financeIcon} alt="info" />
          <p>From $650</p>
        </div>
        <div className={styles.infoElement}>
          <img className={styles.infoIcon} src={cityIcon} alt="info" />
          <p>Singapore</p>
        </div>
        <div className={styles.infoElement}>
          <img className={styles.infoIcon} src={langIcon} alt="info" />
          <p>English, Chinese</p>
        </div>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoElement}>
          <img className={styles.infoIcon} src={timeIcon} alt="info" />
          <p>2 hours total</p>
        </div>
        <div className={styles.infoElement}>
          <img className={styles.infoIcon} src={guestsIcon} alt="info" />
          <p>2-6 guests</p>
        </div>
        <div className={styles.infoElement}>
          <img className={styles.infoIcon} src={peopleVisitedIcon} alt="info" />
          <p>1441 people visited</p>
        </div>
      </div>
    </div>
  )
}

export default InfoWrapper
