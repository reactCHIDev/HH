/* eslint-disable react/prop-types */
import React from 'react'
import { Rate } from 'antd'
import cls from 'classnames'
import styles from './mainRate.module.scss'

import './mainRate.less'

function MainRate({ mainRate, votes }) {
  return (
    <div className={styles.container}>
      <div className={cls(styles.rateWrapper, 'mainRateWrapper')}>
        <Rate style={{ color: '#31394C' }} value={mainRate} disabled allowHalf />
      </div>
      <div className={styles.dataWrapper}>
        <span>{mainRate}/5</span>
        <div>{votes} reviews</div>
      </div>
    </div>
  )
}

export default MainRate
