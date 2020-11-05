import React from 'react'
import Checkmail from 'assets/images/checkmail.svg'
import T from 'prop-types'
import styles from './checkmail.module.scss'

const CheckMail = ({ close }) => {
  return (
    <div className={styles.content}>
      <img src={Checkmail} alt="chk" className={styles.img} />
      <p className={styles.header}>Check mail</p>
      <p className={styles.text}>We have sent a link to confirm your email</p>
      <button type="button" onClick={close}>
        CLOSE WINDOW
      </button>
    </div>
  )
}

CheckMail.propTypes = {
  close: T.func,
}

export default CheckMail
