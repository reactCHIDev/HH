import React from 'react'
import { Rate } from 'antd'
import cls from 'classnames'
import styles from './mainRate.module.scss'

import './mainRate.less'

function MainRate() {
  return (
    <div className={styles.container}>
      <div className={cls(styles.rateWrapper, 'mainRateWrapper')}>
        <Rate style={{ color: '#31394C' }} value={3} disabled />
      </div>
      <div className={styles.dataWrapper}>
        <span>4.4/5</span>
        <div>178 reviews</div>
      </div>
    </div>
  )
}

export default MainRate
