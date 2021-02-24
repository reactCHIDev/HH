/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import envelope from 'assets/icons/svg/envelope.svg'

import AvatarPlaceholder from 'components/AvatarPlaceholder'
import styles from './makerWrapper.module.scss'

function Maker({ info }) {
  // to={`/${info.hungryHuggerLink?.split('/').pop()}`}
  return (
    <Link>
      <div className={styles.wrapper}>
        <div className={styles.mainInfo}>
          <div className={styles.imgWrapper}>
            <div className={styles.img}>
              {info?.coverPhoto ? (
                <img alt="foodmaker cover" src={info.coverPhoto} />
              ) : (
                <AvatarPlaceholder width={96} />
              )}
            </div>
            <div className={styles.icon}>
              <img src={envelope} alt="envelope" />
            </div>
          </div>
          <div className={styles.textWrapper}>
            <div className={styles.name}>Annette P.</div>
            <div className={styles.description}>Foodmaker</div>
          </div>
        </div>
        <div className={styles.secondaryInfo}>
          <div className={styles.heading}>About maker</div>
          <div className={styles.text}>
            I’m a nutritionist ,and baking cooking instructor. When I was younger I went to England
            for a year
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Maker
