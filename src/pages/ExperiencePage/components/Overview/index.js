import React from 'react'

import RateWrapper from './components/RateWrapper'
import InfoWrapper from './components/InfoWrapper'
import MakerWrapper from './components/MakerWrapper'

import styles from './overview.module.scss'

function Overview() {
  return (
    <div className={styles.container}>
      <RateWrapper />
      <InfoWrapper />
      <MakerWrapper />
    </div>
  )
}

export default Overview
