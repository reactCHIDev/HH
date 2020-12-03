import React from 'react'
import T from 'prop-types'
import styles from './message.module.scss'

const Message = (props) => {
  const { closemodal, reset } = props

  return (
    <div className={styles.msg_container} style={{}}>
      <p className={styles.msg_text}>You have an unfinished registration process.</p>
      <div className={styles.btn_block}>
        <button className={styles.msg_btn} id="1" type="button" onClick={closemodal}>
          Continue process
        </button>
        <button className={styles.msg_btn} id="2" type="button" onClick={reset}>
          Reset all data and start from step 1
        </button>
      </div>
    </div>
  )
}

Message.propTypes = {
  closemodal: T.func,
  reset: T.func.isRequired,
}

export default Message
