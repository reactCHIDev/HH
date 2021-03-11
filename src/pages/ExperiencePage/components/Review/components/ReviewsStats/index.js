/* eslint-disable react/prop-types */
import React from 'react'
import styles from './reviewsStats.module.scss'
import MainRate from './MainRate'
import SecondaryRate from './SecondaryRate'

function ReviewsStats({
  mainRate,
  votes,
  enjoymentRate,
  accesibilityRate,
  accuracyRate,
  knowledgeableRate,
  valueForMoneyRate,
}) {
  return (
    <div className={styles.container}>
      <MainRate mainRate={mainRate} votes={votes} />
      <SecondaryRate
        enjoymentRate={enjoymentRate}
        accesibilityRate={accesibilityRate}
        accuracyRate={accuracyRate}
        knowledgeableRate={knowledgeableRate}
        valueForMoneyRate={valueForMoneyRate}
      />
    </div>
  )
}

export default ReviewsStats
