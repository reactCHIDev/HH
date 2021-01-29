import React from 'react'
import T from 'prop-types'
import downloadIcon from 'assets/icons/svg/download.svg'
import AvatarPlaceholder from 'components/AvatarPlaceholder'
import styles from './message.module.scss'

const Message = ({ user, date, message }) => {
  return (
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
        {message.files.map((e, i) => (
          <a href={e} download="file">
            <div className={styles.file_link_wrapper}>
              <img className={styles.dl_icon} src={downloadIcon} alt="dload" />
              File
            </div>
          </a>
        ))}
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
