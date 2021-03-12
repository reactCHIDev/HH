import React from 'react'
import T from 'prop-types'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { replace } from 'connected-react-router'
import cls from 'classnames'
import Caution from 'assets/images/caution.png'
import styles from './errorscreen.module.scss'
import './errorscreen.less'

const ErrorScreen = ({ error, reset }) => {
  const dispatch = useDispatch()

  const toHome = () => {
    reset()
    dispatch(replace('/'))
  }

  return (
    <div className={styles.container}>
      <img className={styles.img} src={Caution} alt="caution" />
      <div className={styles.ooops}>Ooops!!!</div>
      <div className={styles.error}>Something went wrong</div>
      <div className={styles.try}>Try again</div>
      <div className={cls(styles.btn_container, 'success_btn')}>
        <Button type="primary" block size="large" onClick={toHome}>
          To Home page
        </Button>
      </div>
    </div>
  )
}

ErrorScreen.propTypes = {
  error: T.shape(),
  reset: T.func,
}

export default ErrorScreen
