import React from 'react'
import T from 'prop-types'
import { Slider, InputNumber, Button } from 'antd'
import styles from './price_selector.module.scss'
import './price_selector.less'

const PriceSelector = ({ min, max, setMin, setMax, onApply, visible }) => {
  function formatter(value) {
    return `$${value}`
  }

  const onSlider = (value) => {
    setMin(value[0])
    setMax(value[1])
  }

  return (
    <div
      className={visible ? styles.container : styles.hidden}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.content}>
        <Slider
          range
          min={0}
          max={1000}
          tipFormatter={formatter}
          value={[min, max <= 1000 ? max : 1000]}
          defaultValue={[5, 50]}
          onChange={onSlider}
        />
        <div className={styles.input_wrapper}>
          <div className="input_container">
            <label className="form-text">Min. price</label>
            <InputNumber
              value={min}
              onChange={setMin}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '') || 0}
            />
          </div>
          <div className="input_container">
            <label className="form-text">Max. price</label>
            <InputNumber
              value={max}
              onChange={setMax}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '') || 0}
            />
          </div>
        </div>
        <Button type="primary" onClick={onApply} block size="large">
          APPLY
        </Button>
      </div>
    </div>
  )
}

PriceSelector.propTypes = {
  min: T.number.isRequired,
  max: T.number.isRequired,
  visible: T.bool.isRequired,
  setMin: T.func.isRequired,
  setMax: T.func.isRequired,
  onApply: T.func.isRequired,
}

export default PriceSelector
