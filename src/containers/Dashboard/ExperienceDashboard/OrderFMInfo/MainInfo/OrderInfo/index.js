import { stubFalse } from 'lodash'
import React from 'react'
import styles from './orderInfo.module.scss'

function OrderInfo() {
  return (
    <div className={styles.container}>
      {/* SMTH */}
      <div className={styles.statusWrapper}>
        <div className={styles.status}>Status: </div>
        <div className={styles.statusType}>Shipped</div>
      </div>
      {/* SMTH */}
      <div className={styles.orderWrapper}>
        <div className={styles.orderImage} />
        <div className={styles.orderInfoWrapper}>
          <div className={styles.header}>Pie with carrots, apple and cinnamon</div>
          <div className={styles.orderSummaryWrapper}>
            <div className={styles.item}>
              <div>Value</div>
              <div className={styles.value}>400 G.</div>
            </div>
            <div className={styles.item}>
              <div>Qty</div>
              <div className={styles.value}>4</div>
            </div>
            <div className={styles.item}>
              <div>Price</div>
              <div className={styles.value}>$ 24.20</div>
            </div>
          </div>
        </div>
      </div>
      {/* SMTH */}
      <div className={styles.paymentWrapper}>
        <div className={styles.paymentInfo}>
          <div className={styles.item}>
            <div>Payment method:</div>
            <div className={styles.value}>VISA – Credit card</div>
          </div>
          <div className={styles.item}>
            <div>Discounts: </div>
            <div className={styles.value}> - </div>
          </div>
        </div>
        <div className={styles.total}>
          Total: $412.60
          <span className={styles.value}>Refund</span>
        </div>
      </div>
      {/* SMTH */}
      <div className={styles.clientWrapper}>
        <div className={styles.imgWrapper}>
          <div className={styles.img} />
        </div>
        <div className={styles.clientInfo}>
          <div className={styles.mainInfo}>
            <div className={styles.item}>
              <div>Client</div>
              <div className={styles.value}>Heilley H.</div>
            </div>
            <div className={styles.item}>
              <div>Contact number</div>
              <div className={styles.number}>+1 435 435-43-53</div>
            </div>
          </div>
          <div className={styles.secondaryInfo}>
            <div>Address</div>
            <div className={styles.value}>36 Sin Ming Industrial Est Sector A</div>
          </div>
        </div>
      </div>
      {/* SMTH */}
      <div className={styles.summaryWrapper}>
        <div className={styles.column}>
          <div className={styles.item}>
            <div>Order ID</div>
            <div className={styles.value}>#4243243</div>
          </div>
          <div className={styles.item}>
            <div>Delivery type</div>
            <div className={styles.value}>Express</div>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.item}>
            <div>Date/time</div>
            <div className={styles.value}>JUL, 25 10:25</div>
          </div>
          <div className={styles.item}>
            <div>Payment</div>
            <div className={styles.value}>VISA *4383 JUL, 25 10:25</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderInfo
