/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import InvoiceIcon from 'assets/icons/svg/invoice-icon.svg'
import PhoneIcon from 'assets/icons/svg/phone-icon.svg'

import styles from './paymentinfo.module.scss'

const PaymentOrderInfo = ({ orderInfo }) => {
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  const mainDate = new Date(orderInfo.createdAt).toLocaleDateString('en-US', dateOptions)
  const secondaryDate = new Date(orderInfo.createdAt).toLocaleDateString('en-GB', dateOptions)

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.detailsWrapper}>
          <div className={styles.heading}>Transaction details</div>
          <div className={styles.infoWrapper}>
            <div className={styles.item}>
              <div className={styles.text}>Day</div>
              <div className={styles.value}>{mainDate}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.text}>Payment method</div>
              <div className={styles.value}>
                {orderInfo.paymentDetails.brand} *{orderInfo.paymentDetails.last4}
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.text}>Status</div>
              <div className={styles.value}>{orderInfo.deliveryStatus}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.text}>Value</div>
              <div className={styles.value}>$ {orderInfo.orderTotal}</div>
            </div>
          </div>
        </div>
        <div className={styles.invoiceWrapper}>
          <div className={styles.heading}>
            <div className={styles.text}>INVOICE</div>
            <div className={styles.data}>{secondaryDate}</div>
          </div>
          <div className={styles.mainInfo}>
            <div className={styles.column}>
              <div className={styles.header}>From</div>
              <div>Hungry Hugger Ltd.</div>
              <div>hello@hungryhugger.com</div>
              <div>7 Wai Lun St, Hong Kong</div>
            </div>
            <div className={styles.column}>
              <div className={styles.header}>To</div>
              <div># {orderInfo.customer.profileName}</div>
              <div>{orderInfo.customer.email}</div>
            </div>
          </div>
          <div className={styles.mainInfo}>
            <div className={styles.column}>
              <div className={styles.header}>Item</div>
              <div>
                {orderInfo.orderProducts.map((item) => (
                  <div key={item.id}>{item.title}</div>
                ))}
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.header}>Price</div>
              <div>
                {orderInfo.orderProducts.map((item) => (
                  <div key={item.id}>$ {item.price}</div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.foodMakerWrapper}>
            <div className={styles.foodMakerInfo}>
              <div className={styles.foodMakerName}>
                <div className={styles.text}>Food maker</div>
                <div className={styles.data}>
                  {orderInfo.foodmaker.firstName} {orderInfo.foodmaker.lastName.charAt(0)}.
                </div>
              </div>
              <div className={styles.foodMakerPhone}>
                <img src={PhoneIcon} alt="phone-icon" />
                <div>{orderInfo.foodmaker.phone}</div>
              </div>
            </div>
            <div className={styles.printButton}>
              <button
                type="button"
                onClick={() => {
                  window.open(orderInfo.paymentDetails.receipt_url, '_blank')
                }}
              >
                <img src={InvoiceIcon} alt="invoice_icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

PaymentOrderInfo.propTypes = {
  orderHash: T.string,
}

export default connect(({ flOrders }) => ({ orderInfo: flOrders.order }), null)(PaymentOrderInfo)
