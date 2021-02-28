import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { getItem } from 'utils/localStorage'
import { Button, Space, Spin } from 'antd'
import Chk1 from 'assets/images/signup-flow/svg/chk1.svg'
import Chk2 from 'assets/images/signup-flow/svg/chk2.svg'
import { createPublicBookingAC } from 'actions/experience'

import cls from 'classnames'
import './success.less'
import { useDispatch, useSelector } from 'react-redux'
import { replace } from 'connected-react-router'
import styles from './success.module.scss'

const Success = () => {
  const bookingData = getItem('booking')
  const sessionId = getItem('sessionId')
  const dispatch = useDispatch()
  const isRequesting = useSelector((state) => state.experience.requesting)
  const isOrderCreating = useSelector((state) => state.cart.products).length > 0

  useEffect(() => {
    if (!isRequesting) dispatch(createPublicBookingAC({ ...bookingData, sessionId }))
  }, [])

  const toHome = () => {
    dispatch(replace('/'))
  }
  const toBookings = () => {
    dispatch(replace('/experience_dashboard/listings'))
  }

  return (
    <div className={styles.success}>
      {isRequesting ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      ) : (
        <div>
          <p className={styles.title}>Everything is ready!!</p>
          <div className={styles.msg}>Find your booking confirmation in </div>
          <div className={styles.my_bookings} onClick={toBookings}>
            My bookings
          </div>
          <div className={styles.msg}>The copy will be sent to your email</div>

          <div className={cls(styles.msg, styles.mail)}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 34 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="1">
                <rect
                  x="1.33301"
                  y="4"
                  width="21.3333"
                  height="16"
                  rx="3"
                  stroke="#1d53d9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M2.66699 6.66699L10.8378 12.5033C11.5332 13 12.4674 13 13.1628 12.5033L21.3337 6.66699"
                  stroke="#1d53d9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
            alexwatson@gmail.com
          </div>
          <div className={cls(styles.btn_container, 'success_btn')}>
            <Button type="primary" block size="large" onClick={toHome}>
              CLOSE
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

Success.propTypes = {}

export default Success
