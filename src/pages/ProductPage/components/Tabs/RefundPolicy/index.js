import React from 'react'
import T from 'prop-types'
import styles from './refund_policy.module.scss'
import './refund_policy.less'

const RefundPolicy = ({ refund, note }) => {
  return (
    <>
      <div className={styles.container}>
        <p>{refund.replace('_', ' ')}</p>
        {note ? (
          <p>{note}</p>
        ) : (
          <p>{refund === 'NO_REFUND' ? 'Non-refundable :(' : 'Contact maker for refund details'}</p>
        )}
      </div>
    </>
  )
}

RefundPolicy.propTypes = {}

export default RefundPolicy
