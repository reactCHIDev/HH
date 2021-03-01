import React from 'react'
import T from 'prop-types'

import RateWrapper from './components/RateWrapper'
import InfoWrapper from './components/InfoWrapper'
import MakerWrapper from './components/MakerWrapper'

import styles from './overview.module.scss'

function Overview({
  rate,
  rateAmount,
  priceFrom,
  city,
  time,
  maxGuests,
  languages,
  visits,
  foodmaker,
}) {
  return (
    <div className={styles.container}>
      <RateWrapper rate={rate} rateAmount={rateAmount} />
      <InfoWrapper
        priceFrom={priceFrom}
        city={city}
        time={time}
        maxGuests={maxGuests}
        languages={languages}
        visits={visits}
      />
      <MakerWrapper foodmaker={foodmaker} />
    </div>
  )
}

Overview.propTypes = {
  rate: T.number.isRequired,
  rateAmount: T.string.isRequired,
  priceFrom: T.number.isRequired,
  city: T.string.isRequired,
  time: T.number.isRequired,
  maxGuests: T.string.isRequired,
  languages: T.string.isRequired,
  visits: T.string.isRequired,
  foodmaker: T.shape(),
}

export default Overview
