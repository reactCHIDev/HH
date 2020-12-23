import React from 'react'
import styles from './modal.module.scss'

const Modal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Сancellation request (#362424)</div>
      <div className={styles.info}>
        Please describe the reason for the cancellation and we will send it to the maker to clarify
        the possibility of cancellation
      </div>
      <div className={styles.inputWrapper}>
        <div>Text your message</div>
        <textarea type="text" rows="7" placeholder="Input here" />
      </div>
      <button type="button">SEND</button>
    </div>
  )
}

export default Modal
