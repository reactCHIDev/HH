import React from 'react'
import MainInfo from './components/MainInfo'
import Overview from './components/Overview'
import About from './components/About'
import GuestPhotos from './components/GuestPhotos'
import Review from './components/Review'
import styles from './expPage.module.scss'

function ExperincePage() {
  return (
    <div className={styles.wrapper}>
      <MainInfo />
      <div className={styles.container}>
        <Overview />
        <About />
        {/* <GuestPhotos /> */}
        <Review />
      </div>
    </div>
  )
}

export default ExperincePage
