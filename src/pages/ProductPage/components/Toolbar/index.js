import React, { useState } from 'react'
import T from 'prop-types'
import { Select } from 'antd'
import cls from 'classnames'
import Button from 'components/Button/index'
import styles from './toolbar.module.scss'
import './toolbar.less'

const Toolbar = ({ params, isPreOrderOnly }) => {
  const [weightOption, setWeightOption] = useState(params[0].volume)
  const [count, setCount] = useState(1)

  const handleWeightChange = (value) => setWeightOption(value)
  const handleCountDecrement = () =>
    setCount((oldCount) => (oldCount > 1 ? oldCount - 1 : oldCount))
  const handleCountIncrement = () => setCount((oldCount) => oldCount + 1)

  const { Option } = Select

  return (
    <div className={styles.container}>
      <div className={styles.price}>
        {params.find((p) => p.volume === weightOption)?.price.toFixed(2)}
      </div>
      <div className={cls(styles.select_container, 'selects')}>
        <Select defaultValue={weightOption} onChange={handleWeightChange}>
          {true &&
            params
              .map((p) => p.volume)
              .map((weight) => (
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
  params: T.arrayOf(T.shape).isRequired,
  isPreOrderOnly: T.bool.isRequired,
}

export default Toolbar
