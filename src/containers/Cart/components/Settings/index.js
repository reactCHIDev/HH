/* eslint-disable react/prop-types */
import React from 'react'
import Modal from 'components/UniversalModal'
import AdressForm from '../AdressForm'
import styles from './settings.module.scss'

function Settings({ price, active }) {
  const [modal, setModal] = React.useState(false)

  const handler = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  console.log('%c   active   ', 'color: darkgreen; background: palegreen;', active)

  return (
    <div className={styles.container}>
      <div className={styles.backTextWrapper}>
        <p>{'<'}</p>
        <p>CONTINUE SHOPPING</p>
      </div>
      <div className={styles.orderWrapper} style={{ opacity: active ? 1 : 0.4 }}>
        <div className={styles.orderTextWrapper}>
          <p className={styles.totalText}>Total: </p>
          <p className={styles.currencyText}>$</p>
          <p className={styles.mainPriceText}>{price || 0}</p>
          {/* <p>.30</p> */}
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
