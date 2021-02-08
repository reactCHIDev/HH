import React from 'react'
import T from 'prop-types'
import downloadIcon from 'assets/icons/svg/download.svg'
import AvatarPlaceholder from 'components/AvatarPlaceholder'
import PreviewIcon from '../PreviewIcon'

import styles from './message.module.scss'

const Message = ({ user, date, message, setPreview }) => {
  return (
    <div className={styles.msg_wrapper}>
      <div className={styles.container}>
        <div className={styles.local_avatar_info}>
          <div className={styles.local_avatar_box}>
            {user?.userPhoto ? <img src={user?.userPhoto} alt="avatar" /> : <AvatarPlaceholder />}
          </div>
        </div>
        <div className={styles.text_container}>
          <div className={styles.info_container}>
            <div className={styles.local_name}>{user?.profileName}</div>
            <div className={styles.last_date}>{date}</div>
          </div>
          <div className={styles.text_msg}>{message.text}</div>
          <div className={styles.preview_wrapper}>
            {message.files.map((e, i) => (
              <PreviewIcon key={e} fileLink={e} setPreview={setPreview} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

Message.propTypes = {
  user: T.shape().isRequired,
  date: T.string.isRequired,
  message: T.shape().isRequired,
}

export default Message
