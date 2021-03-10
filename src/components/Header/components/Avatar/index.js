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
          <Avatar shape="circle" size={40} icon={<UserOutlined />} src={imgsrc} alt="avatar" />
        </Badge>
      </div>
    </div>
  )
}

UserImage.propTypes = {
  imgsrc: T.string,
}

export default UserImage
