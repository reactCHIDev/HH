import React from 'react'
import { Rate } from 'antd'
import cls from 'classnames'
import styles from './rateWrapper.module.scss'
import './rateWrapper.less'

function index() {
  return (
    <div className={styles.rateWrapper}>
      <div className={styles.heading}>Overview</div>
      <div className={cls(styles.overviewRate, 'overviewRate')}>
        <Rate style={{ color: '#31394C' }} value={2} disabled />
        <p>(64)</p>
      </div>
    </div>
  )
}

export default index
