/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'

import { useDispatch } from 'react-redux'
import { setItem } from 'utils/localStorage'
import Modal from 'components/UniversalModal'
import AdressForm from '../AdressForm'
import styles from './settings.module.scss'

function Settings({ price, active, isAuthorized }) {
  const [modal, setModal] = React.useState(false)
  const dispatch = useDispatch()

  const handler = () => {
    if (isAuthorized) {
      setModal(true)
    } else {
      setItem('loginFromCart', true)
      dispatch(push('/login/regular'))
    }
  }

  const closeModal = () => {
    setModal(false)
  }

  return (
    <div className={styles.container}>
      <Link to="/">
        <div className={styles.backTextWrapper}>
          <p>{'<'}</p>
          <p>CONTINUE SHOPPING</p>
        </div>
      </Link>
      <div className={styles.orderWrapper} style={{ opacity: active ? 1 : 0.4 }}>
        <div className={styles.orderTextWrapper}>
          <p className={styles.totalText}>Total: </p>
          <p className={styles.currencyText}>$</p>
          <p className={styles.mainPriceText}>{price.toFixed(2) || 0}</p>
        </div>
        <div>
          <button className={styles.orderButton} type="button" disabled={!active} onClick={handler}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
      {modal && (
        <Modal closeFunc={closeModal} option>
          <AdressForm closeFunc={closeModal} />
        </Modal>
      )}
    </div>
  )
}

export default Settings
