import React, { useEffect, useState } from 'react'
import T from 'prop-types'
import { Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToBasket } from 'actions/cart'
import isProductAvailable from 'utils/isProductAvailable'
import cls from 'classnames'
import Button from 'components/Button/index'
import styles from './toolbar.module.scss'
import './toolbar.less'

const Toolbar = ({ params, isPreOrderOnly }) => {
  const [weightOption, setWeightOption] = useState(params[0].volume)
  const [count, setCount] = useState(1)
  const product = useSelector((state) => state.product.info)

  const dispatch = useDispatch()

  useEffect(() => setWeightOption(params[0].volume), [params])

  const handleWeightChange = (value) => setWeightOption(value)
  const handleCountDecrement = () =>
    setCount((oldCount) => (oldCount > 1 ? oldCount - 1 : oldCount))
  const handleCountIncrement = () => setCount((oldCount) => oldCount + 1)

  const onProductClick = () => {
    const data = { ...product, ...{ amount: count } }
    dispatch(addProductToBasket(data))
  }

  const endDate = {
    day: new Date(product.availabilityEndDate).toLocaleDateString('en-US', {
      day: 'numeric',
    }),
    month: new Date(product.availabilityEndDate).toLocaleDateString('en-US', {
      month: 'short',
    }),
  }

  const getPrice = (amount) => {
    const isDiscount = amount + 1 > product.discount.quantity
    return isDiscount
      ? params.find((p) => p.volume === weightOption)?.price.toFixed(2) *
          (1 - product.discount.discount / 100)
      : params.find((p) => p.volume === weightOption)?.price.toFixed(2)
  }

  const { Option } = Select
  return (
    <div className={styles.container}>
      <div className={styles.price}>{getPrice(count)}</div>
      <div className={cls(styles.select_container, 'selects')}>
        <Select defaultValue={weightOption} onChange={handleWeightChange}>
          {params
            .map((p) => p.volume)
            .map((weight) => (
              <Option key={weight} value={weight}>
                {`${weight}${
                  params.find((p) => p.volume === weight).measure === 'none'
                    ? ''
                    : params.find((p) => p.volume === weight).measure
                }`}
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
        {isPreOrderOnly || !isProductAvailable(product) ? (
          <Button
            title="PRE-ORDER"
            endDate={endDate}
            onClick={() => {
              console.log('submit')
            }}
          />
        ) : (
          <Button
            title="ADD TO CART"
            onClick={() => {
              onProductClick()
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
