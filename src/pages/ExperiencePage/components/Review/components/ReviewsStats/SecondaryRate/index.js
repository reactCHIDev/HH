/* eslint-disable react/prop-types */
import React from 'react'
import cls from 'classnames'
import { Rate } from 'antd'

import styles from './secondaryRate.module.scss'
import './secondaryRate.less'

function SecondaryRate({
  enjoymentRate,
  accesibilityRate,
  accuracyRate,
  knowledgeableRate,
  valueForMoneyRate,
}) {
  return (
    <div className={styles.container}>
      <div className={cls(styles.secondaryRate, 'secondaryRate')}>
        <Rate style={{ color: '#31394C' }} value={enjoymentRate} disabled />
        <p>Enjoyment</p>
      </div>
      <div className={cls(styles.secondaryRate, 'secondaryRate')}>
        <Rate style={{ color: '#31394C' }} value={accesibilityRate} disabled />
        <p>Accessibility</p>
      </div>
      <div className={cls(styles.secondaryRate, 'secondaryRate')}>
        <Rate style={{ color: '#31394C' }} value={valueForMoneyRate} disabled />
        <p>Value for Money</p>
      </div>
      <div className={cls(styles.secondaryRate, 'secondaryRate')}>
        <Rate style={{ color: '#31394C' }} value={accuracyRate} disabled />
        <p>Accuracy</p>
      </div>
      <div className={cls(styles.secondaryRate, 'secondaryRate')}>
        <Rate style={{ color: '#31394C' }} value={knowledgeableRate} disabled />
        <p>Knowledgeable</p>
      </div>
    </div>
  )
}

export default SecondaryRate
