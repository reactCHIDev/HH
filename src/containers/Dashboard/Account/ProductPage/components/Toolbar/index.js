import React, { useState } from 'react'
import T from 'prop-types'
import { Select } from 'antd'
import cls from 'classnames'
import Button from 'components/Button/index'
import styles from './toolbar.module.scss'
import './toolbar.less'

const Toolbar = ({ price, weightOptions, isShowWeightOptions, isPreOrderOnly }) => {
  const [weightOption, setWeightOption] = useState(weightOptions[0])
  const [count, setCount] = useState(1)

  const handleWeightChange = (value) => setWeightOption(value)
  const handleCountDecrement = () =>
    setCount((oldCount) => (oldCount > 1 ? oldCount - 1 : oldCount))
  const handleCountIncrement = () => setCount((oldCount) => oldCount + 1)

  const { Option } = Select

  return (
    <div className={styles.container}>
      <div className={styles.price}>{price}</div>
      <div className={cls(styles.select_container, 'selects')}>
        <Select defaultValue={weightOption} onChange={handleWeightChange}>
          {isShowWeightOptions &&
            weightOptions.map((weight) => (
              <Option key={weight} value={weight}>
                {`${weight}g`}
              </Option>
            ))}
        </Select>
      </div>
      <div className={styles.count}>
        <button className={styles.button_left} type="button" onClick={handleCountDecrement}>
          -
        </button>
        <div className={styles.count_text}>{count}</div>
        <button className={styles.button_right} type="button" onClick={handleCountIncrement}>
          +
        </button>
      </div>
      <div className={styles.order_button}>
        {isPreOrderOnly ? (
          <Button
            title="PRE-ORDER"
            onClick={() => {
              console.log('submit')
            }}
          />
        ) : (
          <Button
            title="ADD TO CARD"
            onClick={() => {
              console.log('submit')
            }}
          />
        )}
      </div>
    </div>
  )
}

Toolbar.propTypes = {
  price: T.number.isRequired,
  weightOptions: T.arrayOf(T.string).isRequired,
  isShowWeightOptions: T.bool.isRequired,
  isPreOrderOnly: T.bool.isRequired,
}

export default Toolbar
