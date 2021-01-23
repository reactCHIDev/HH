import React from 'react'
import T from 'prop-types'
import AvatarPlaceholder from 'components/AvatarPlaceholder'
import cls from 'classnames'
import styles from './contact.module.scss'

const Contact = ({ id, url, name, unreaded = 2, activeChat, setActiveChat }) => {
  const openDialog = (e) => {
    const { id } = e.currentTarget
    const recipient = { id, name, url }
    setActiveChat(id, recipient)
  }

  return (
    <div
      className={cls(styles.container, Number(activeChat) === Number(id) ? styles.selected : '')}
    >
      <div className={styles.local_avatar_info} id={id} onClick={openDialog}>
        <div className={styles.local_avatar_box}>
          {url ? <img src={url} alt="avatar" /> : <AvatarPlaceholder />}
        </div>
        <div className={styles.info_container}>
          <div className={styles.local_name}>{name}</div>
          <div className={styles.last_date}>12 May, 12:42</div>
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
  url: T.string.isRequired,
  name: T.string.isRequired,
  unreaded: T.number.isRequired,
  id: T.number.isRequired,
  activeChat: T.string.isRequired,
  setActiveChat: T.func.isRequired,
}

export default Contact
