import React from 'react'
import T from 'prop-types'
import Caution from 'assets/images/caution.png'
import styles from './errorscreen.module.scss'
import './errorscreen.less'

const ErrorScreen = ({ error, reset }) => {
  const toHome = () => {
    reset()
  }

  const link =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.REACT_APP_BASE_URL

  return (
    <div className={styles.container}>
      <img className={styles.img} src={Caution} alt="caution" />
      <div className={styles.ooops}>Ooops!!!</div>
      <div className={styles.error}>Something went wrong</div>
      <div className={styles.try}>Try again</div>
      <a className={styles.link} href={link} onClick={toHome}>
        To Home page
      </a>
    </div>
  )
}

ErrorScreen.propTypes = {
  error: T.shape(),
  reset: T.func,
}

export default ErrorScreen
