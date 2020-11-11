import React, { useState } from 'react'
import T from 'prop-types'
import { getItem, setItem } from 'utils/localStorage'
import { Select } from 'antd'
import ChkBox from 'components/ChkBox'
import { CaretDownOutlined } from '@ant-design/icons'
import cls from 'classnames'
import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import styles from './step2.module.scss'
import './step2.less'
import { setTemporaryEndpoint } from 'utils/apiClient'

const Step2 = (props) => {
  const { setStep } = props

  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [discount, setDiscount] = useState(false)
  const [discValue, setDiscountValue] = useState(0)
  const [qtyValue, setQtyValue] = useState(0)

  const { Option } = Select

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  })

  const nums = ['Food', 'Drinks', 'qweqwe', 'sdfsdfsd', 'zxczxcz', 'yuryutyu', 'ghfghfg']
  const discnt = ['5%', '10%', '15%', '20%', '25%', '30%', '40%']
  const qty = ['5qty', '10qty', '15qty', '20qty', '25qty', '30qty', '40qty']

  const onNext = (data) => {
    const step1 = getItem('addProduct')
    setItem('addProduct', {
      ...step1,
      ...data,
      type,
      category,
      discount,
      discValue,
      qtyValue,
    })
    setStep()
  }

  const handleTypeChange = (value) => setType(value)
  const handleCategoryChange = (value) => setCategory(value)

  const onChangeChkBox = () => setDiscount(!discount)
  const handleDiscountChange = (value) => setDiscountValue(value)
  const handleQuantityChange = (value) => setQtyValue(value)

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit(onNext)}>
          <label className={styles.label}>Product title (no more than 66 char. recommened)</label>
          <input
            className={styles.input}
            id="step2"
            name="title"
            type="text"
            ref={register({
              required: true,
              maxLength: {
                value: 66,
              },
            })}
          />
          {_.get('title.type', errors) === 'required' && (
            <p className={styles.errmsg}>This field is required</p>
          )}
          {_.get('title.type', errors) === 'maxLength' && (
            <p className={styles.errmsg}>Max length 66 symbols</p>
          )}
          <label htmlFor="step2-2" className={styles.label}>
            Product title (no more than 66 char. recommened)
          </label>
          <textarea
            className={styles.textarea}
            name="description"
            rows="4"
            ref={register({
              required: true,
            })}
          />
          {_.get('description.type', errors) === 'required' && (
            <p className={styles.errmsg}>This field is required</p>
          )}
          <div className={cls(styles.select_container, 'selects')}>
            <Select defaultValue={nums[0]} onChange={handleTypeChange}>
              {nums.map((n, i) => (
                <Option key={i + n} value={n}>
                  {n}
                </Option>
              ))}
            </Select>
            <Select defaultValue={nums[0]} onChange={handleCategoryChange}>
              {nums.map((n, i) => (
                <Option key={i + n} value={n}>
                  {n}
                </Option>
              ))}
            </Select>
          </div>
          <div className={cls(styles.discount_container, 'discount')}>
            <ChkBox
              id="discount"
              labelText="Add discount"
              checked={discount}
              onChange={onChangeChkBox}
            />
            <Select defaultValue={discValue} onChange={handleDiscountChange}>
              {discnt.map((n, i) => (
                <Option key={i + n} value={n}>
                  {n}
                </Option>
              ))}
            </Select>
            <p className={styles.discount_text}>when buying from</p>
            <Select defaultValue={qtyValue} onChange={handleQuantityChange}>
              {qty.map((n, i) => (
                <Option key={i + n} value={n}>
                  {n}
                </Option>
              ))}
            </Select>
          </div>
          <input type="submit" value="Next" />
        </form>
      </div>
    </div>
  )
}

Step2.propTypes = {
  setStep: T.func.isRequired,
}

export default Step2
