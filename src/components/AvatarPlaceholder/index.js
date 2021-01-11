import React from 'react'
import T from 'prop-types'
import Avatar from 'assets/icons/svg/user.svg'
// import styles from './avaholder.module.scss'
// import './avaholder.less'

const AvatarPlaceholder = ({ width = 48 }) => {
  return <img src={Avatar} width={width} height={width} alt="avatar" />
}

AvatarPlaceholder.propTypes = {
  width: T.number,
}

export default AvatarPlaceholder
