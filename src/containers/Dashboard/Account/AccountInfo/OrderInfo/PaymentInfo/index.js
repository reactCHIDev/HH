import React from 'react'
import T from 'prop-types'
import styles from './paymentinfo.module.scss'

const PaymentOrderInfo = (props) => {
  const { orderHash } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.detailsWrapper}>
          <div className={styles.heading}>Transaction details</div>
          <div className={styles.infoWrapper}>
            <div className={styles.item}>
              <div className={styles.text}>Day</div>
              <div className={styles.value}>23 MAY, 20</div>
            </div>
            <div className={styles.item}>
              <div className={styles.text}>Payment method</div>
              <div className={styles.value}>VISA *6558</div>
            </div>
            <div className={styles.item}>
              <div className={styles.text}>Status</div>
              <div className={styles.value}>SHIPPED</div>
            </div>
            <div className={styles.item}>
              <div className={styles.text}>Value</div>
              <div className={styles.value}>$ 48</div>
            </div>
          </div>
        </div>
        <div className={styles.invoiceWrapper}>
          <div className={styles.heading}>
            <div className={styles.text}>INVOICE</div>
            <div className={styles.data}>27 feb, 20</div>
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
              <div>#username </div>
              <div>username@gmail.com</div>
            </div>
          </div>
          <div className={styles.mainInfo}>
            <div className={styles.column}>
              <div className={styles.header}>Item</div>
              <div>Pie with carrots, apple and cinnamon</div>
            </div>
            <div className={styles.column}>
              <div className={styles.header}>Price</div>
              <div>$ 48</div>
            </div>
          </div>
          <div className={styles.foodMakerWrapper}>
            <div className={styles.foodMakerInfo}>
              <div className={styles.foodMakerName}>
                <div className={styles.text}>Food maker</div>
                <div className={styles.data}>Alex D.</div>
              </div>
              <div className={styles.foodMakerPhone}>
                <div>+1 435 435-43-53</div>
              </div>
            </div>
            <div className={styles.printButton}>
              <button type="button">x</button>
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

export default PaymentOrderInfo
