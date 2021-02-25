import React from 'react'
import cls from 'classnames'
import { Rate } from 'antd'

import styles from './secondaryRate.module.scss'
import './secondaryRate.less'

function SecondaryRate() {
  return (
    <div className={styles.container}>
      <div className={cls(styles.secondaryRate, 'secondaryRate')}>
        <Rate style={{ color: '#31394C' }} value={2} disabled />
        <p>Enjoyment</p>
      </div>
      <div className={cls(styles.secondaryRate, 'secondaryRate')}>
        <Rate style={{ color: '#31394C' }} value={2} disabled />
        <p>Accessibility</p>
      </div>
      <div className={cls(styles.secondaryRate, 'secondaryRate')}>
        <Rate style={{ color: '#31394C' }} value={2} disabled />
        <p>Value for Money</p>
      </div>
      <div className={cls(styles.secondaryRate, 'secondaryRate')}>
        <Rate style={{ color: '#31394C' }} value={2} disabled />
        <p>Accuracy</p>
      </div>
      <div className={cls(styles.secondaryRate, 'secondaryRate')}>
        <Rate style={{ color: '#31394C' }} value={2} disabled />
        <p>Knowledgeable</p>
      </div>
    </div>
  )
}

export default SecondaryRate
