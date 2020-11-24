import React from 'react'
import T from 'prop-types'
import { Avatar, Badge } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import cls from 'classnames'

import styles from './avatar.module.scss'
import './avatar.less'

const UserImage = (props) => {
  const { imgsrc } = props

  return (
    <div className={cls(styles.container, 'avatar-container')}>
      <div className={styles.content}>
        <Badge dot>
          <Avatar shape="circle" size={40} icon={<UserOutlined />} src={imgsrc} />
        </Badge>
      </div>
    </div>
  )
}

UserImage.propTypes = {
  a: T.number.isRequired,
  b: T.string.isRequired,
  c: T.bool.isRequired,
  f: T.func.isRequired,
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
      content: T.node,
    }).isRequired,
  }).isRequired,
}

export default UserImage
