import React from 'react'
import T from 'prop-types'
import styles from './maininfo.module.scss'

const MainOrderInfo = (props) => {
  const { orderHash } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>ORDER DETAILED INFO</div>
    </div>
  )
}

MainOrderInfo.propTypes = {
  orderHash: T.string,
}

export default MainOrderInfo
