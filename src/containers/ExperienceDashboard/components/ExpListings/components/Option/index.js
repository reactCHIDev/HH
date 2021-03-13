/* eslint-disable react/prop-types */
import React from 'react'
import cls from 'classnames'
import T from 'prop-types'
import { Switch } from 'antd'

import styles from './option.module.scss'
import './option.less'

const Option = ({ checked, id, onChange }) => {
  return (
    <div className={styles.container}>
      <p className={cls(styles.title, checked ? styles.off : '')}>PAUSED</p>
      <Switch className="switch" checked={checked} size="small" onChange={() => onChange(id)} />
      <p className={checked ? styles.on : styles.off}>PUBLISHED</p>
    </div>
  )
}

Option.propTypes = {
  checked: T.bool,
  onChange: T.func,
}

export default Option
