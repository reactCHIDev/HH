import React from 'react'
import T from 'prop-types'
import styles from './message.module.scss'

const Message = (props) => {
  const { reset } = props

  return (
    <div className={styles.msg_container} style={{}}>
      <div>
        <p className={styles.msg_text}>You already have a Foodmaker account.</p>
        <p className={styles.msg_text}>You need to logout to create the new one.</p>
      </div>
      <div className={styles.btn_block}>
        <button className={styles.msg_btn} id="1" type="button" onClick={reset}>
          Ok
        </button>
      </div>
    </div>
  )
}

Message.propTypes = {
  reset: T.func.isRequired,
}

export default Message
