/* eslint-disable react/prop-types */
import React from 'react'
import T from 'prop-types'
import styles from './delivery_info.module.scss'
import './delivery_info.less'

const DeliveryInfo = ({ region, deliveryMethods }) => {
  return (
    <div className={styles.container}>
      <div className={styles.info_section}>
        <div className={styles.sub_title}>Delivery region</div>
        <div className={styles.text}>{region}</div>
      </div>
      {deliveryMethods.map((e) => {
        return (
          <div className={styles.info_section}>
            {e?.type && (
              <p className={styles.sub_title}>
                Delivery: {e.type !== 'FreePickUp' ? e.type : 'Free pick-up'}
              </p>
            )}
            {e?.price && <p className={styles.text}>Cost of delivery: HKD {e.price}</p>}
            {e?.freeDeliveryOver && (
              <p className={styles.text}>Free for order over HKD {e.freeDeliveryOver}</p>
            )}
            {e?.note ? (
              <p className={styles.text}>Note: {e.note}</p>
            ) : (
              e.type !== 'FreeDelivery' && (
                <p className={styles.text}>
                  {`Note: Contact maker for ${
                    e.type === 'FreePickUp' ? 'pick-up' : 'delivery'
                  } details`}
                </p>
              )
            )}
          </div>
        )
      })}
    </div>
  )
}

// DeliveryInfo.propTypes = {
//   deliveryMethods: T.shape(),
//   region: T.string,
// }

export default DeliveryInfo
