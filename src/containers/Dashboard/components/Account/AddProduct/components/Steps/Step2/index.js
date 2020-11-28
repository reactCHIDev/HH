import React, { useState } from 'react'
import T from 'prop-types'
import { getItem, setItem } from 'utils/localStorage'
import { Select } from 'antd'
import ChkBox from 'components/ChkBox'
import { CaretDownOutlined } from '@ant-design/icons'
import cls from 'classnames'
import _ from 'lodash/fp'
import { useForm, Controller } from 'react-hook-form'
import styles from './step2.module.scss'
import './step2.less'
import { setTemporaryEndpoint } from 'utils/apiClient'

const Step2 = (props) => {
  const { setStep, types = [], stepper, setStepper } = props

  let title, description, productCategoryId, productTypeId, discount
  if (getItem('addProduct'))
    ({ title, description, productCategoryId, productTypeId, discount } = getItem('addProduct'))

  const [discnt, setDiscount] = useState(!!discount?.discount && !!discount?.quantity)
  const [discValue, setDiscountValue] = useState(discount?.discount)
  const [qtyValue, setQtyValue] = useState(discount?.quantity)
  const [category, setCategory] = useState(
    types.find((t) => t.id === productTypeId)?.productCategories || [],
  )

  const { Option } = Select

  console.log('%c   types   ', 'color: darkgreen; background: palegreen;', category)

  console.log('types', types)
  console.log('productTypeId', productTypeId)

  const defaultValues = productTypeId
    ? {
        title,
        description,
        productTypeId,
        productCategoryId: types
          .find((t) => t.id === productTypeId)
          .productCategories.find((c) => c.id === productCategoryId)?.id,
      }
    : {}

  const { register, handleSubmit, control, watch, setValue, errors } = useForm({
    mode: 'onBlur',
    defaultValues,
  })

  const nums = ['Food', 'Drinks', 'qweqwe', 'sdfsdfsd', 'zxczxcz', 'yuryutyu', 'ghfghfg']
  const discntArr = [
    { value: 5, title: '5%' },
    { value: 10, title: '10%' },
    { value: 15, title: '15%' },
    { value: 20, title: '20%' },
    { value: 25, title: '25%' },
    { value: 30, title: '30%' },
    { value: 40, title: '40%' },
    { value: 50, title: '50%' },
  ]
  const qty = [
    { value: 5, title: '5qty' },
    { value: 10, title: '10qty' },
    { value: 15, title: '15qty' },
    { value: 20, title: '20qty' },
    { value: 25, title: '25qty' },
    { value: 30, title: '30qty' },
    { value: 40, title: '40qty' },
    { value: 50, title: '50qty' },
  ]

  const onNext = (data) => {
    const step1 = getItem('addProduct')
    setItem('addProduct', {
      ...step1,
      ...data,
      discount: { quantity: discnt ? qtyValue : 0, discount: discnt ? discValue : 0 },
    })
    setStep(2)
    setStepper(false)
  }

  const onChangeChkBox = () => setDiscount(!discnt)

  const handleDiscountChange = (value) => {
    setDiscountValue(value)
    if (!stepper) setStepper(true)
  }

  const handleQuantityChange = (value) => {
    setQtyValue(value)
    if (!stepper) setStepper(true)
  }

  const handleType = (onChange) => (e) => {
    setCategory(types.find((t) => t.id === e).productCategories)
    onChange(e)
    setValue('productCategoryId', types.find((t) => t.id === e).productCategories[0]?.id)
    if (!stepper) setStepper(true)
  }

  const onChangeForm = () => {
    if (!stepper) setStepper(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onChange={onChangeForm} onSubmit={handleSubmit(onNext)}>
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
            Description
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
            <Controller
              control={control}
              name="productTypeId"
              rules={{ required: true }}
              render={({ onChange, value, name }) => (
                <div className={styles.item_container}>
                  <label className={styles.label}>Type of product</label>
                  <Select onChange={handleType(onChange)} name={name} value={value}>
                    {types &&
                      types.map((type) => (
                        <Option key={type.id} value={type.id}>
                          {type.title}
                        </Option>
                      ))}
                  </Select>
                  {_.get('productTypeId.type', errors) === 'required' && (
                    <p className={styles.errmsg}>This field is required</p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="productCategoryId"
              rules={{ required: true }}
              render={({ onChange, value, name }) => (
                <div className={styles.item_container}>
                  <label className={styles.label}>Category</label>
                  <Select
                    onChange={onChange}
                    name={name}
                    value={value}
                    // disabled={watch('productTypeId') === 'Food'}
                  >
                    {category.map((cat) => (
                      <Option key={cat.id} value={cat.id}>
                        {cat.title}
                      </Option>
                    ))}
                  </Select>
                  {_.get('productCategoryId.type', errors) === 'required' && (
                    <p className={styles.errmsg}>This field is required</p>
                  )}
                </div>
              )}
            />
          </div>
          <div className={cls(styles.discount_container, 'discount')}>
            <ChkBox
              id="discount"
              labelText="Add discount"
              checked={discnt}
              onChange={onChangeChkBox}
            />
            <Select defaultValue={discValue} onChange={handleDiscountChange}>
              {discntArr.map((n) => (
                <Option key={n.value} value={n.value}>
                  {n.title}
                </Option>
              ))}
            </Select>
            <p className={styles.discount_text}>when buying from</p>
            <Select defaultValue={qtyValue} onChange={handleQuantityChange}>
              {qty.map((n) => (
                <Option key={n.value} value={n.value}>
                  {n.title}
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
  types: T.shape(),
}

export default Step2
