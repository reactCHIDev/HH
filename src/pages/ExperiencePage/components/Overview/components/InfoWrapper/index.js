import React from 'react'
import T from 'prop-types'

import financeIcon from 'assets/icons/svg/overview-finance.svg'
import cityIcon from 'assets/icons/svg/overview-city.svg'
import peopleVisitedIcon from 'assets/icons/svg/overview-people-visited.svg'
import timeIcon from 'assets/icons/svg/overview-time.svg'
import guestsIcon from 'assets/icons/svg/overview-guests.svg'
import langIcon from 'assets/icons/svg/overview-lang.svg'

import styles from './infoWrapper.module.scss'

function InfoWrapper({ priceFrom, city, time, maxGuests, languages, visits }) {
  function formatter(t) {
    const duration = t * 5 + 30
    const h = Math.floor(duration / 60)
    const m = duration % 60
    return `${h ? `${h}h` : ''} ${m ? `${m}m ` : ''}`
  }
  return (
    <div className={styles.infoWrapper}>
      <div className={styles.infoRow}>
        <div className={styles.infoElement}>
          <img className={styles.infoIcon} src={financeIcon} alt="info" />
          <p>From ${priceFrom}</p>
        </div>
        <div className={styles.infoElement}>
          <img className={styles.infoIcon} src={cityIcon} alt="info" />
          <p>{city}</p>
        </div>
        <div className={styles.infoElement}>
          <img className={styles.infoIcon} src={langIcon} alt="info" />
          <p>{languages}</p>
        </div>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoElement}>
          <img className={styles.infoIcon} src={timeIcon} alt="info" />
          <p>{formatter(time)}</p>
        </div>
        <div className={styles.infoElement}>
          <img className={styles.infoIcon} src={guestsIcon} alt="info" />
          <p>1-{maxGuests} guests</p>
        </div>
        <div className={styles.infoElement}>
          <img className={styles.infoIcon} src={peopleVisitedIcon} alt="info" />
          <p>{visits} people visited</p>
        </div>
      </div>
    </div>
  )
}

InfoWrapper.propTypes = {
  priceFrom: T.number.isRequired,
  city: T.string.isRequired,
  time: T.number.isRequired,
  maxGuests: T.string.isRequired,
  languages: T.string.isRequired,
  visits: T.string.isRequired,
}

export default InfoWrapper
