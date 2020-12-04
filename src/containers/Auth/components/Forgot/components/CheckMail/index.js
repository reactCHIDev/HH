import React from 'react'
import Checkmail from 'assets/images/checkmail.svg'
import T from 'prop-types'
import styles from './checkmail.module.scss'

const EnterMail = ({ close }) => {
  return (
    <div className={styles.content}>
      <img src={Checkmail} alt="chk" className={styles.img} />
      <p className={styles.header}>Check mail</p>
      <p className={styles.text}>We have sent a link to reset your password</p>
      <button type="button" onClick={close}>
        CLOSE WINDOW
      </button>
    </div>
  )
}

EnterMail.propTypes = {
  close: T.func,
}

export default EnterMail
