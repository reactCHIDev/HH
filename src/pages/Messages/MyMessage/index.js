import React from 'react'
import T from 'prop-types'
import PreviewIcon from '../PreviewIcon'
import styles from './message.module.scss'

const Message = ({ date, message, setPreview }) => {
  const pics = ['jpg', 'jpeg', 'png']
  return (
    <div className={styles.msg_wrapper}>
      <div className={styles.container}>
        <div className={styles.text_container}>
          <div className={styles.info_container}>
            <div className={styles.local_name}>You</div>
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
  date: T.string.isRequired,
  message: T.shape().isRequired,
}

export default Message
