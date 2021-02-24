import React from 'react'
import ImageWrapper from './ImageWrapper/index'
import CalendarWrapper from './CalendarWrapper'
import styles from './mainInfo.module.scss'

function MainInfo() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ImageWrapper />
        <CalendarWrapper />
      </div>
    </div>
  )
}

export default MainInfo
