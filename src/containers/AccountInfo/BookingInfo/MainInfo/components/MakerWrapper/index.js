import React from 'react'
import T from 'prop-types'

import envelope from 'assets/icons/svg/envelope.svg'

import AvatarPlaceholder from 'components/AvatarPlaceholder'
import styles from './makerWrapper.module.scss'

function Maker({ foodmaker }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainInfo}>
        <div className={styles.imgWrapper}>
          <div className={styles.img}>
            {foodmaker?.coverPhoto ? (
              <img alt="foodmaker cover" src={foodmaker.coverPhoto} />
            ) : (
              <AvatarPlaceholder width={96} />
            )}
          </div>
          <div className={styles.icon}>
            <img src={envelope} alt="envelope" />
          </div>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.name}>{foodmaker?.firstName || 'Sasha'}</div>
          <div className={styles.description}>Foodmaker</div>
        </div>
      </div>
      <div className={styles.secondaryInfo}>
        <div className={styles.heading}>About maker</div>
        <div className={styles.text}>{foodmaker?.about || 'Lol'}</div>
      </div>
    </div>
  )
}

Maker.propTypes = {
  foodmaker: T.shape(),
}

export default Maker
