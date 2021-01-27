import React from 'react'
import T from 'prop-types'
import styles from './message.module.scss'

const Message = ({ date, text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <div className={styles.info_container}>
          <div className={styles.local_name}>You</div>
          <div className={styles.last_date}>{date}</div>
        </div>
        <div className={styles.text_msg}>{text}</div>
      </div>
    </div>
  )
}

Message.propTypes = {
  date: T.string.isRequired,
  text: T.string.isRequired,
}

export default Message
