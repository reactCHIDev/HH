import React from 'react'
import ExpHeader from '../ExpHeader'
import styles from './mainInfo.module.scss'

function MainInfo() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ExpHeader />
      </div>
    </div>
  )
}

export default MainInfo
