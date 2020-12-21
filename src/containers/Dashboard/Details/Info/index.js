import React from 'react'
import styles from './info.module.scss'
import Table from './Table'

function Info({ setIsCancelModalShowm }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.shopTitle}>Annett’s fairytale shop</div>
        <button type="button">VIEW SHOP</button>
      </div>
      <Table />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid black',
          padding: '20px 0 20px 0',
        }}
      >
        <div>
          <div>Delivery</div>
          <div style={{ color: '#5375CB', textTransform: 'capitalize' }}>Standart</div>
        </div>
        <div>$ 20.00</div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0 0 0',
          marginBottom: '300px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div
            style={{ marginRight: '20px', color: '#EB5769' }}
            onClick={() => {
              setIsCancelModalShowm(true)
            }}
          >
            Cancel order
          </div>
          <div>Cancellation policy</div>
        </div>
        <div>Total: $ 109.00</div>
      </div>
    </div>
  )
}

export default Info
