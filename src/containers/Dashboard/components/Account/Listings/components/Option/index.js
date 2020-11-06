import React, { useState } from 'react'
import cls from 'classnames'
import T from 'prop-types'
import { Switch } from 'antd'

import styles from './option.module.scss'
import './option.less'

const Option = ({ checked = false }) => {
  const [state, SetState] = useState(checked)

  function onChange(chckd) {
    SetState(chckd)
  }

  return (
    <div className={styles.container}>
      <p className={cls(styles.title, state ? styles.off : '')}>PAUSED</p>
      <Switch className="switch" size="small" onChange={onChange} />
      <p className={state ? styles.on : styles.off}>PUBLISHED</p>
    </div>
  )
}

Option.propTypes = {
  checked: T.bool,
}

export default Option
