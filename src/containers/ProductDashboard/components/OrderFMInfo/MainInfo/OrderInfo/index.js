/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import InvoiceIcon from 'assets/icons/svg/invoice-icon.svg'
import AvatarPlaceholder from 'components/AvatarPlaceholder'
import StatusWrapper from './components/Status'
import styles from './orderInfo.module.scss'

function OrderInfo() {
  const order = useSelector((state) => state.fmOrders.order)

  const date = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  const time = new Date(order.createdAt).toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: '2-digit',
  })

  const paymentDetails = `${order.paymentDetails?.brand}  *${order.paymentDetails?.last4}  ${date} ${time}`

  return order?.orderProducts ? (
    <div className={styles.container}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <StatusWrapper deliveryStatus={order.deliveryStatus} id={order.id} />
        <div className={styles.printButton}>
          <button
            type="button"
            onClick={() => {
              // window.open(orderInfo.paymentDetails.receipt_url, '_blank')
            }}
          >
            <img src={InvoiceIcon} alt="invoice_icon" />
          </button>
        </div>
      </div>
      {/* Order */}
      {order.orderProducts.map((item) => (
        <div key={item.id}>
          <div className={styles.orderWrapper}>
            {/* <div className={styles.orderImageWrapper}> */}
            <div style={{ backgroundImage: `url("${item.coverPhoto}")` }} className={styles.img} />
            {/* </div> */}
            <div className={styles.orderInfoWrapper}>
              <div className={styles.header}>{item.title}</div>
              <div className={styles.orderSummaryWrapper}>
                <div className={styles.item}>
                  <div>Value</div>
                  <p className={styles.value}>
                    {item.volume} {item.measure}
                  </p>
                </div>
                <div className={styles.item}>
                  <div>Qty</div>
                  <p className={styles.value}>{item.quantity}</p>
                </div>
                <div className={styles.item}>
                  <div>Price</div>
                  <p className={styles.value}>{item.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Payment */}
      <div className={styles.paymentWrapper}>
        <div className={styles.paymentInfo}>
          <div className={styles.item}>
            <div>Payment method:</div>
            <div className={styles.value}>{order.paymentDetails.brand} - credit card</div>
          </div>
          <div className={styles.item}>
            <div>Discounts: </div>
            <div className={styles.value}> - </div>
          </div>
        </div>
        <div className={styles.total}>
          Total: {order.orderTotal}$<span className={styles.value}>Refund</span>
        </div>
      </div>
      {/* Client */}
      <div className={styles.clientWrapper}>
        <div className={styles.imgWrapper}>
          {order.customer.userPhoto ? (
            <div
              style={{ backgroundImage: `url("${order.customer?.userPhoto}")` }}
              className={styles.img}
            />
          ) : (
            <AvatarPlaceholder width={96} />
          )}
        </div>
        <div className={styles.clientInfo}>
          <div className={styles.mainInfo}>
            <div className={styles.item}>
              <div>Client</div>
              <div className={styles.value}>
                {order.customer?.firstName} {order.customer?.lastName}
              </div>
              {order.deliveryCompany && (
                <div>
                  <div>Company</div>
                  <div className={styles.value}>{order.deliveryCompany}</div>
                </div>
              )}
            </div>
            <div className={styles.item}>
              <div>Contact number</div>
              <div className={styles.number}>{order.deliveryPhone}</div>
            </div>
          </div>
          <div className={styles.secondaryInfo}>
            <div>Address</div>
            <div className={styles.value}>{order.deliveryAddress}</div>
          </div>
        </div>
      </div>
      {/* Summary */}
      <div className={styles.summaryWrapper}>
        <div className={styles.column}>
          <div className={styles.item}>
            <div>Order ID</div>
            <div className={styles.value}>#{order.id}</div>
          </div>
          <div className={styles.item}>
            <div>Delivery type</div>
            <div className={styles.value}>{order.deliveryMethod}</div>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.item}>
            <div>Date/time</div>
            <div className={styles.value}>
              {date} {time}
            </div>
          </div>
          <div className={styles.item}>
            <div>Payment</div>
            <div className={styles.value}>{paymentDetails}</div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default OrderInfo
