import React from 'react'
import Cross from 'assets/images/signup-flow/svg/cross.svg'
import T from 'prop-types'
import styles from './error.module.scss'

const Error = ({ message = 'Something went wrong!', close }) => {
  return (
    <div className={styles.content}>
      <img src={Cross} alt="cross" className={styles.img} />
      <p className={styles.header}>Error</p>
      <p className={styles.text}>{message}</p>
      <p className={styles.text}>Try again.</p>
      <button type="button" onClick={close}>
        CLOSE
      </button>
    </div>
  )
}

Error.propTypes = {
  message: T.string,
  close: T.func,
}

export default Error
