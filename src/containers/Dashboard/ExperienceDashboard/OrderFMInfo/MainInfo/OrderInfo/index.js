/* eslint-disable react/prop-types */
import React from 'react'
import styles from './orderInfo.module.scss'

function OrderInfo({ order }) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.statusWrapper}>
        <div className={styles.status}>Status: </div>
        <div className={styles.statusType}>{`status`}</div>
      </div>
      {/* Order */}
      <div className={styles.orderWrapper}>
        <div className={styles.orderImageWrapper}>
          <div className={styles.img} />
        </div>
        <div className={styles.orderInfoWrapper}>
          <div className={styles.header}>{order.productName}</div>
          <div className={styles.orderSummaryWrapper}>
            <div className={styles.item}>
              <div>Value</div>
              <p className={styles.value}>{order.amount} G.</p>
            </div>
            <div className={styles.item}>
              <div>Qty</div>
              <p className={styles.value}>{order.items}</p>
            </div>
            <div className={styles.item}>
              <div>Price</div>
              <p className={styles.value}>{order.price}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Payment */}
      <div className={styles.paymentWrapper}>
        <div className={styles.paymentInfo}>
          <div className={styles.item}>
            <div>Payment method:</div>
            <div className={styles.value}>{order.paymentMethod}</div>
          </div>
          <div className={styles.item}>
            <div>Discounts: </div>
            <div className={styles.value}> - </div>
          </div>
        </div>
        <div className={styles.total}>
          Total: {order.total}
          <span className={styles.value}>{order.priceOption}</span>
        </div>
      </div>
      {/* Client */}
      <div className={styles.clientWrapper}>
        <div className={styles.imgWrapper}>
          <div className={styles.img} />
        </div>
        <div className={styles.clientInfo}>
          <div className={styles.mainInfo}>
            <div className={styles.item}>
              <div>Client</div>
              <div className={styles.value}>{order.client}</div>
            </div>
            <div className={styles.item}>
              <div>Contact number</div>
              <div className={styles.number}>{order.clientNumber}</div>
            </div>
          </div>
          <div className={styles.secondaryInfo}>
            <div>Address</div>
            <div className={styles.value}>{order.clientAddress}</div>
          </div>
        </div>
      </div>
      {/* Summary */}
      <div className={styles.summaryWrapper}>
        <div className={styles.column}>
          <div className={styles.item}>
            <div>Order ID</div>
            <div className={styles.value}>#${order.id}</div>
          </div>
          <div className={styles.item}>
            <div>Delivery type</div>
            <div className={styles.value}>{order.delivery}</div>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.item}>
            <div>Date/time</div>
            <div className={styles.value}>{`${order.date} ${order.time}`}</div>
          </div>
          <div className={styles.item}>
            <div>Payment</div>
            <div className={styles.value}>{order.payment}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderInfo
