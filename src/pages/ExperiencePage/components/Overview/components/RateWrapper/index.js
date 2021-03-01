import React from 'react'
import T from 'prop-types'
import { Rate } from 'antd'
import cls from 'classnames'

import styles from './rateWrapper.module.scss'
import './rateWrapper.less'

function RateWrapper({ rate, rateAmount }) {
  return (
    <div className={styles.rateWrapper}>
      <div className={styles.heading}>Overview</div>
      <div className={cls(styles.overviewRate, 'overviewRate')}>
        <Rate style={{ color: '#31394C' }} value={rate} disabled />
        <p>({rateAmount})</p>
      </div>
    </div>
  )
}

RateWrapper.propTypes = {
  rate: T.number.isRequired,
  rateAmount: T.string.isRequired,
}

export default RateWrapper
