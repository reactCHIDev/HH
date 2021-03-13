/* eslint-disable import/order */
import React from 'react'
import { Button } from 'antd'
import info from 'assets/icons/svg/info-red.svg'
import cls from 'classnames'
import styles from './error.module.scss'
import './error.less'
import { useDispatch } from 'react-redux'
import { replace } from 'connected-react-router'

const Error = () => {
  const dispatch = useDispatch()
  const toHome = () => {
    dispatch(replace('/'))
  }
  const toListings = () => {
    dispatch(replace('/experience_dashboard/listings'))
  }

  return (
    <div className={styles.success}>
      <p className={styles.title}>Payment failed</p>
      <div className={styles.msg}>Please try again</div>
      <div className={styles.my_bookings} onClick={toListings}>
        <img className={styles.img} src={info} alt="info" />
        No response received from the payment system, it may be worth checking the Internet
        connection
      </div>
      <div className={cls(styles.btn_container, 'success_btn')}>
        <Button type="primary" block size="large" onClick={toHome}>
          BACK TO BOOKING
        </Button>
      </div>
    </div>
  )
}

Error.propTypes = {}

export default Error
