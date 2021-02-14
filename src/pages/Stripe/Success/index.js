import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { getItem } from 'utils/localStorage'
import { Button } from 'antd'
import Chk1 from 'assets/images/signup-flow/svg/chk1.svg'
import Chk2 from 'assets/images/signup-flow/svg/chk2.svg'
import { createOrderRequestrinAc } from 'actions/order'
import cls from 'classnames'
import styles from './success.module.scss'
import './success.less'
import { useDispatch } from 'react-redux'
import { replace } from 'connected-react-router'

const Success = () => {
  const adressData = getItem('adress')
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(createOrderRequestrinAc(adressData))
  }, [])
  const toHome = () => {
    dispatch(replace('/'))
  }
  const toOrders = () => {
    dispatch(replace('/account_info/orders'))
  }

  return (
    <div className={styles.success}>
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
          <Button type="primary" block size="large" onClick={toOrders}>
            To orders
          </Button>
        </div>
      </div>
    </div>
  )
}

Success.propTypes = {}

export default Success
