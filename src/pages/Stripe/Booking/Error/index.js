import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { getItem } from 'utils/localStorage'
import { Button } from 'antd'
import Cross from 'assets/images/signup-flow/svg/cross.svg'
import { createOrderRequestrinAc } from 'actions/order'
import cls from 'classnames'
import styles from './error.module.scss'
import './error.less'
import { useDispatch } from 'react-redux'
import { replace } from 'connected-react-router'

const Success = () => {
  const adressData = getItem('adress')
  const dispatch = useDispatch()
  // dispatch(createOrderRequestrinAc(adressData))
  const toHome = () => {
    dispatch(replace('/'))
  }
  const toCart = () => {
    dispatch(replace('/cart'))
  }

  return (
    <div className={styles.success}>
      <img className={styles.img} src={Cross} alt="chk" />
      <p className={styles.title}>Sorry!</p>
      <p className={styles.msg}>Something went wrong. Try again.</p>
      <div className={styles.btn_block}>
        <div className={styles.btn_container}>
          <Button type="primary" block size="large" onClick={toHome}>
            To Home page
          </Button>
        </div>
        <div className={styles.btn_container}>
          <Button type="primary" block size="large" onClick={toCart}>
            To Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

Success.propTypes = {}

export default Success
