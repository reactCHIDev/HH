/* eslint-disable react/prop-types */
import React from 'react'
import styles from './maker.module.scss'

function Maker({ info }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainInfo}>
        <div className={styles.imgWrapper}>
          <div className={styles.img}>
            <img alt="foodmaker cover" src={info.coverPhoto} />
          </div>
          <div className={styles.icon} />
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.name}>{info.firstName}</div>
          <div className={styles.description}>{info.description}</div>
        </div>
      </div>
      <div className={styles.secondaryInfo}>
        <div className={styles.heading}>About maker</div>
        <div className={styles.text}>{info.about}</div>
      </div>
    </div>
  )
}

export default Maker
