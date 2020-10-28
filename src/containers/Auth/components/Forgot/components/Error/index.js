import React from 'react'
import Cross from 'assets/images/signup-flow/svg/cross.svg'
import T from 'prop-types'
import styles from './error.module.scss'

const EnterMail = ({ close }) => {
  return (
    <div className={styles.content}>
      <img src={Cross} alt="cross" className={styles.img} />
      <p className={styles.header}>Error</p>
      <p className={styles.text}>Something went wrong!</p>
      <p className={styles.text}>Try again.</p>
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
