import React from 'react'
import { getItem } from 'utils/localStorage'
import { Button, Space, Spin } from 'antd'
import Chk1 from 'assets/images/signup-flow/svg/chk1.svg'
import Chk2 from 'assets/images/signup-flow/svg/chk2.svg'
import { createOrderRequestrinAc } from 'actions/order'

import './success.less'
import { useDispatch, useSelector } from 'react-redux'
import { replace } from 'connected-react-router'
import styles from './success.module.scss'

const Success = () => {
  const adressData = getItem('adress')
  const dispatch = useDispatch()
  const isRequesting = useSelector((state) => state.order.requesting)
  const isOrderCreating = useSelector((state) => state.cart.products).length > 0

  React.useEffect(() => {
    if (!isRequesting) dispatch(createOrderRequestrinAc(adressData))
    // eslint-disable-next-line
  }, [])

  const toHome = () => {
    dispatch(replace('/'))
  }
  const toOrders = () => {
    dispatch(replace('/account_info/orders'))
  }

  return (
    <div className={styles.success}>
      {isOrderCreating ? (
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
              <Button type="primary" block size="large" onClick={toOrders}>
                To orders
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
