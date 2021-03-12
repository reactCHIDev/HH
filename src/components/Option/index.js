import React, { useState } from 'react'
import cls from 'classnames'
import T from 'prop-types'
import { Switch } from 'antd'

import styles from './option.module.scss'
import './option.less'

const Option = ({ checked, id, onChange }) => {
  return (
    <div className={cls(styles.container, 'switch')}>
      <p className={cls(styles.title, checked ? styles.off : '')}>PAUSED</p>
      <Switch checked={checked} size="small" onChange={() => onChange(id)} />
      <p className={checked ? styles.on : styles.off}>PUBLISHED</p>
    </div>
  )
}

Option.propTypes = {
  checked: T.bool,
  onChange: T.func,
}

export default Option
