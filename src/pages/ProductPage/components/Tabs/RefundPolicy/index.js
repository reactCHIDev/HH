import React from 'react'
import T from 'prop-types'
import styles from './refund_policy.module.scss'
import './refund_policy.less'

const RefundPolicy = ({ refund, note }) => {
  return (
    <>
      <div className={styles.container}>{refund}</div>
      <div className={styles.container}>{note}</div>
    </>
  )
}

RefundPolicy.propTypes = {}

export default RefundPolicy
