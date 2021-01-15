/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch } from 'react-redux'
import cls from 'classnames'

import { changeDeliveryStatusAc } from 'actions/foodmaker-orders'
import ArrowDark from 'assets/icons/svg/down-arrow.svg'

import styles from './status.module.scss'

const statusTypes = [
  { type: 'Pick Up' },
  { type: 'Sent' },
  { type: 'Delivered' },
  { type: 'Cancelled' },
  { type: 'New Order' },
]
function StatusWrapper({ deliveryStatus, id }) {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = React.useState(false)
  const [currentType, setCurrentType] = React.useState(deliveryStatus)
  const [itemsToShow, setItemsToShow] = React.useState([])

  React.useEffect(() => {
    setItemsToShow(statusTypes.filter((el) => el.type !== currentType))
  }, [currentType])

  const clickHandler = (delStatus) => {
    setCurrentType(delStatus)
    setIsVisible(false)
    dispatch(changeDeliveryStatusAc({ id, delStatus }))
  }

  return (
    <div className={styles.statusWrapper}>
      <div className={styles.status}>Status: </div>
      <div className={styles.statusType}>{currentType}</div>
      <div className={styles.button} type="button" onClick={() => setIsVisible((v) => !v)}>
        <img
          className={cls(styles.arrow, isVisible ? styles.arrow_up : '')}
          src={ArrowDark}
          alt="arrow"
        />
      </div>

      {isVisible ? (
        <div className={styles.typesWrapper}>
          {itemsToShow.map((item) => (
            <div onClick={() => clickHandler(item.type)} key={item.type}>
              {item.type}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default StatusWrapper
