/* eslint-disable react/prop-types */
import React from 'react'
import AdressForm from 'pages/Cart/components/AdressForm'
import Modal from 'components/UniversalModal'
import styles from './settings.module.scss'

function Settings({ price }) {
  const [modal, setModal] = React.useState(false)

  const handler = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
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
      {modal && (
        <Modal closeFunc={closeModal} option>
          <AdressForm closeFunc={closeModal} />
        </Modal>
      )}
    </div>
  )
}

export default Settings
