import React from 'react'
import T from 'prop-types'
import AvatarPlaceholder from 'components/AvatarPlaceholder'
import cls from 'classnames'
import styles from './contact.module.scss'

const Contact = ({ id, userPhoto, date, profileName, unreaded, activeChat, setActiveChat }) => {
  const openDialog = (e) => {
    const id = Number(e.currentTarget.id)
    if (id === activeChat) return
    const recipient = { id, profileName, userPhoto }
    setActiveChat(id, recipient)
  }

  return (
    <div
      className={cls(styles.container, Number(activeChat) === Number(id) ? styles.selected : '')}
    >
      <div className={styles.local_avatar_info} id={id} onClick={openDialog}>
        <div className={styles.local_avatar_box}>
          {userPhoto ? <img src={userPhoto} alt="avatar" /> : <AvatarPlaceholder />}
        </div>
        <div className={styles.info_container}>
          <div className={styles.local_name}>{profileName}</div>
          <div className={styles.last_date}>{date}</div>
        </div>
      </div>
      {Number(unreaded) > 0 ? (
        <div className={styles.unreaded}>
          <div className={styles.label}>{unreaded}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

Contact.propTypes = {
  userPhoto: T.string,
  profileName: T.string.isRequired,
  unreaded: T.number.isRequired,
  id: T.number.isRequired,
  activeChat: T.number,
  setActiveChat: T.func.isRequired,
}

export default Contact
