/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'
import T from 'prop-types'
import { Divider } from 'antd'
import useClickOutside from 'hooks/useClickOutside'
import styles from './guests_selector.module.scss'
import './guests_selector.less'

const GuestsSelector = ({
  visible,
  setVisibilityGuestsSelector,
  discount,
  isAdult,
  priceAdult,
  priceChild,
  adult,
  setAdultCount,
  childrenn,
  setChildrenCount,
  available,
}) => {
  useEffect(() => {
    setAdultCount(1)
    setChildrenCount(0)
    // eslint-disable-next-line
  }, [available])

  const selector = useRef(null)
  useClickOutside(selector, () => setVisibilityGuestsSelector(false))

  const handleCountDecrement = () =>
    setAdultCount((oldCount) =>
      oldCount > 0 && oldCount + childrenn >= 1 ? oldCount - 1 : oldCount,
    )
  const handleCountIncrement = () =>
    setAdultCount((oldCount) => (oldCount + childrenn < available ? oldCount + 1 : oldCount))
  const handleChildrenDecrement = () =>
    setChildrenCount((oldCount) =>
      oldCount > 0 && oldCount + adult >= 1 ? oldCount - 1 : oldCount,
    )
  const handleChildrenIncrement = () => setChildrenCount((oldCount) => oldCount + 1)

  return (
    <div
      className={visible ? styles.container : styles.hidden}
      onClick={(e) => e.stopPropagation()}
      ref={selector}
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
            disabled={adult + childrenn >= available}
            onClick={handleCountIncrement}
          >
            +
          </button>
        </div>
        {!isAdult && (
          <div>
            <div className={styles.label_container}>
              <label className={styles.label}>Children</label>
              <label className={styles.label}>{`$${priceChild}/p`}</label>
            </div>
            <div className={styles.count}>
              <button
                className={styles.button_left}
                type="button"
                onClick={handleChildrenDecrement}
              >
                -
              </button>
              <div className={styles.count_text}>{childrenn}</div>
              <button
                className={styles.button_right}
                type="button"
                disabled={adult + childrenn >= available}
                onClick={handleChildrenIncrement}
              >
                +
              </button>
            </div>
          </div>
        )}

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
