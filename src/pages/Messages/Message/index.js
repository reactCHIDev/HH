import React from 'react'
import T from 'prop-types'
import AvatarPlaceholder from 'components/AvatarPlaceholder'
import cls from 'classnames'
import styles from './message.module.scss'

const Message = ({
  url = 'https://hungryhugger-space.fra1.digitaloceanspaces.com/72cb3de3-61ef-4149-afae-75f9bf1be702_1610962040437.jpg',
  name = 'AlexFM',
  date = '12 May, 12:42',
  text = 'qewrwer wsf sdfsdf sdfs dfsdfsdfsd sdfsdfsdf sdfsdf sdfsdfsd fsdfsdfs dfsdfsdf sdfsdfs',
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.local_avatar_info}>
        <div className={styles.local_avatar_box}>
          {url ? <img src={url} alt="avatar" /> : <AvatarPlaceholder />}
        </div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.info_container}>
          <div className={styles.local_name}>{name}</div>
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
