import React from 'react'
import T from 'prop-types'
import { Spin, Space } from 'antd'
import styles from './tint.module.scss'

const Tint = () => {
  const onClick = (e) => e.stopPropagation()
  return (
    <div className={styles.container} onClick={onClick}>
      <Space size="large">
        <Spin size="large" />
      </Space>
    </div>
  )
}

Tint.propTypes = {}

export default Tint
