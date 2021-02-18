import React from 'react'
import T from 'prop-types'
import styles from './message.module.scss'

const Message = (props) => {
  const { closemodal, reset } = props

  return (
    <div className={styles.msg_container} style={{}}>
      <p className={styles.msg_text}>
        You are going to duplicate this experience. You will be able to change the duplicate with no
        effect to the original experience. Please, press “Duplicate” to proceed or “Cancel” to close
        this window
      </p>
      <div className={styles.btn_block}>
        <button className={styles.msg_btn} id="1" type="button" onClick={closemodal}>
          Duplicate
        </button>
        <button className={styles.msg_btn} id="2" type="button" onClick={reset}>
          Cancel
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
