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
  const toListings = () => {
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
        <>
          <div className={styles.chk_container}>
            <img className={styles.chk1} src={Chk1} alt="chk" />
            <img className={styles.chk2} src={Chk2} alt="chk" />
          </div>
          <p className={styles.title}>Thank You!</p>
          <p className={styles.msg}>Your payment was successful</p>
          <div className={styles.btn_block}>
            <div className={styles.btn_container}>
              <Button type="primary" block size="large" onClick={toHome}>
                To Home page
              </Button>
            </div>
            <div className={styles.btn_container}>
              <Button type="primary" block size="large" onClick={toListings}>
                To listings
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

Success.propTypes = {}

export default Success
