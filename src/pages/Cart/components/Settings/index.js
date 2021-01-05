/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch } from 'react-redux'
import { createOrderRequestrinAc } from 'actions/order'
import styles from './settings.module.scss'

function Settings({ price }) {
  const dispatch = useDispatch()

  const handler = () => {
    dispatch(createOrderRequestrinAc())
  }
  return (
    <div className={styles.container}>
      <div className={styles.backTextWrapper}>
        <p>{'<'}</p>
        <p>CONTINUE SHOPPING</p>
      </div>
      <div className={styles.orderWrapper}>
        <div className={styles.orderTextWrapper}>
          <p className={styles.totalText}>Total: </p>
          <p className={styles.currencyText}>$</p>
          <p className={styles.mainPriceText}>{price || 0}</p>
          {/* <p>.30</p> */}
        </div>
        <div>
          <button className={styles.orderButton} type="button" onClick={handler}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
