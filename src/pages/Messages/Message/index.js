import React from 'react'
import T from 'prop-types'
import AvatarPlaceholder from 'components/AvatarPlaceholder'
import cls from 'classnames'
import styles from './message.module.scss'

const Message = ({ user, date = '12 May, 12:42', text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.local_avatar_info}>
        <div className={styles.local_avatar_box}>
          {user?.url ? <img src={user?.url} alt="avatar" /> : <AvatarPlaceholder />}
        </div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.info_container}>
          <div className={styles.local_name}>{user?.name}</div>
          <div className={styles.last_date}>{date}</div>
        </div>
        <div className={styles.text_msg}>{text}</div>
      </div>
    </div>
  )
}

Message.propTypes = {
  url: T.string.isRequired,
  name: T.string.isRequired,
  date: T.string.isRequired,
  text: T.string.isRequired,
}

export default Message
