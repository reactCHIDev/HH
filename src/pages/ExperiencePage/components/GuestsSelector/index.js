import React, { useState } from 'react'
import T from 'prop-types'
import { Slider, Divider, Button } from 'antd'
import styles from './guests_selector.module.scss'
import './guests_selector.less'

const GuestsSelector = ({
  visible,
  discount,
  guests,
  priceAdult,
  priceChild,
  adult,
  setAdultCount,
  children,
  setChildrenCount,
}) => {
  const handleCountDecrement = () =>
    setAdultCount((oldCount) => (oldCount > 0 ? oldCount - 1 : oldCount))
  const handleCountIncrement = () => setAdultCount((oldCount) => oldCount + 1)
  const handleChildrenDecrement = () =>
    setChildrenCount((oldCount) => (oldCount > 0 ? oldCount - 1 : oldCount))
  const handleChildrenIncrement = () => setChildrenCount((oldCount) => oldCount + 1)

  return (
    <div
      className={visible ? styles.container : styles.hidden}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.content}>
        <div className={styles.label_container}>
          <label className={styles.label}>Adults</label>
          <label className={styles.label}>{`$${priceAdult}/p`}</label>
        </div>
        <div className={styles.count}>
          <button className={styles.button_left} type="button" onClick={handleCountDecrement}>
            -
          </button>
          <div className={styles.count_text}>{adult}</div>
          <button
            className={styles.button_right}
            type="button"
            disabled={adult + children >= guests}
            onClick={handleCountIncrement}
          >
            +
          </button>
        </div>
        <div className={styles.label_container}>
          <label className={styles.label}>Children</label>
          <label className={styles.label}>{`$${priceChild}/p`}</label>
        </div>
        <div className={styles.count}>
          <button className={styles.button_left} type="button" onClick={handleChildrenDecrement}>
            -
          </button>
          <div className={styles.count_text}>{children}</div>
          <button
            className={styles.button_right}
            type="button"
            disabled={adult + children >= guests}
            onClick={handleChildrenIncrement}
          >
            +
          </button>
        </div>

        <Divider />

        <div className={styles.discount_green}>{`Get ${discount.discount}% discount`}</div>
        <div className={styles.discount}>{`when booking ${discount.quantity} guests or more`}</div>
      </div>
    </div>
  )
}

GuestsSelector.propTypes = {
  visible: T.bool.isRequired,
}

export default GuestsSelector
