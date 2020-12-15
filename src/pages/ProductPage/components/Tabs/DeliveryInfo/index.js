import React from 'react'
import T from 'prop-types'
import styles from './delivery_info.module.scss'
import './delivery_info.less'

const DeliveryInfo = ({ region }) => {
  return (
    <div className={styles.container}>
      <div className={styles.info_section}>
        <div className={styles.title}>Delivery region</div>
        <div className={styles.text}>{region}</div>
      </div>
      <div className={styles.info_section}>
        <div className={styles.title}>Delivery type</div>
        <div className={styles.sub_title}>Standard</div>
        <div className={styles.text}>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
        </div>
        <div className={styles.sub_title}>Express</div>
        <div className={styles.text}>
          Sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    </div>
  )
}

DeliveryInfo.propTypes = {
  region: toString,
}

export default DeliveryInfo
