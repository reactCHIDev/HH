import React, { useState } from 'react'
import T from 'prop-types'
import { getItem, setItem } from 'utils/localStorage'

import { Select, Slider, InputNumber, Checkbox } from 'antd'
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
  if (getItem('addExperience'))
    ({ title, description, productCategoryId, productTypeId, discount } = getItem('addExperience'))
  const [selectedItems, setSelectedItems] = useState([
    'sdfsd',
    'sdfsdf',
    'sdfsdfdf',
    'xcvxcv',
    'xcvxcvxv',
  ])
  const [tags, setTags] = useState(['asdasd', 'dfdfg', 'werwer', 'jghjghj'])
  const [languages, setLangs] = useState(['English', 'Japan', 'German'])
  const [selectedLangs, setSelectedLangs] = useState([])
  const [isAdult, setIsAdult] = useState(false)
  const [maxPrice, setMaxPrice] = useState(0)
  const [discnt, setDiscount] = useState(!!discount?.discount && !!discount?.quantity)
  const [discValue, setDiscountValue] = useState(discount?.discount)
  const [qtyValue, setQtyValue] = useState(discount?.quantity)
  const [category, setCategory] = useState(
    types.find((t) => t.id === productTypeId)?.productCategories || [],
  )

  const { Option } = Select

  const defaultValues = productTypeId
    ? {
        title,
        description,
        productTypeId,
        productCategoryId: types
          .find((t) => t.id === productTypeId)
          .productCategories.find((c) => c.id === productCategoryId)?.id,
        discountVal: discValue,
        qtyVal: qtyValue,
      }
    : {}

  const { register, handleSubmit, control, watch, setValue, errors } = useForm({
    mode: 'onBlur',
    defaultValues,
  })

  const onNext = (data) => {
    const step1 = getItem('addExperience')
    const { discountVal, qtyVal } = data
    delete data.discountVal
    delete data.qtyVal

    setItem('addExperience', {
      ...step1,
      ...data,
      discount: { quantity: discnt ? +qtyVal : 0, discount: discnt ? +discountVal : 0 },
    })
    setStep()
    setStepper(false)
  }

  const handleChangeTags = (selectedItms) => {
    setSelectedItems(selectedItms)
  }
  const handleChangeLangs = (selectedLngs) => {
    setSelectedLangs(selectedLngs)
  }
  const filteredTags = tags.length ? tags.filter((o) => !selectedItems.includes(o.tagName)) : []
  const filteredLangs = languages.filter((o) => !selectedLangs.includes(o.tagName))

  const onChangeChkBox = () => setDiscount(!discnt)
  const isAdultChk = () => setIsAdult((a) => !a)

  const handleType = (onChange) => (e) => {
    setCategory(types.find((t) => t.id === e).productCategories)
    onChange(e)
    setValue('productCategoryId', types.find((t) => t.id === e).productCategories[0]?.id)
    if (!stepper) setStepper(true)
  }

  const onChangeForm = () => {
    if (!stepper) setStepper(true)
  }

  function formatter(value) {
    const time = value * 3 + 30
    const h = Math.floor(time / 60)
    const m = time % 60
    return `${h ? `${h}h` : ''} ${m ? `${m}m ` : ''}`
  }

  const onSlider = (value) => {
    setMaxPrice(value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onChange={onChangeForm} onSubmit={handleSubmit(onNext)}>
          <label className={styles.label}>Experience title</label>
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

          <label className={styles.label}>Experience type</label>
          <div className={cls(styles.service_tags, 'exp_selects')}>
            <Select
              name="expType"
              mode="multiple"
              value={selectedItems}
              onChange={handleChangeTags}
              showArrow
              style={{ width: '100%' }}
            >
              {filteredTags.map((item) => (
                <Select.Option key={item.id} value={item.tagName}>
                  {item.tagName}
                </Select.Option>
              ))}
            </Select>
          </div>

          <label className={styles.label}>Tags</label>
          <div className={cls(styles.service_tags, 'exp_selects')}>
            <Select
              name="tags"
              mode="multiple"
              value={tags}
              onChange={handleChangeTags}
              showArrow
              style={{ width: '100%' }}
            >
              {filteredTags.map((item) => (
                <Select.Option key={item.id} value={item.tagName}>
                  {item.tagName}
                </Select.Option>
              ))}
            </Select>
          </div>

          <label className={styles.label}>Duration</label>
          <div className={cls(styles.slider_container, 'exp-slider')}>
            <Slider
              tipFormatter={formatter}
              value={maxPrice}
              onChange={onSlider}
              step={10}
              tooltipVisible
            />
          </div>

          <div className={styles.price_block}>
            <div className={cls(styles.input_number, 'exp-input_number')}>
              <label className={styles.label}>Price per adults</label>
              <Controller
                control={control}
                name="Standardprice"
                rules={{ required: false }}
                render={({ onChange, value, name }) => (
                  <InputNumber
                    name={name}
                    value={value}
                    onChange={onChange}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                )}
              />
            </div>
            <div className={cls(styles.input_number, 'exp-input_number')}>
              <label className={styles.label}>Per child (age 6 - 16)</label>
              <Controller
                control={control}
                name="Standardprice"
                rules={{ required: false }}
                render={({ onChange, value, name }) => (
                  <InputNumber
                    name={name}
                    value={value}
                    onChange={onChange}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                )}
              />
            </div>
            <div>
              <Checkbox checked={isAdult} onChange={isAdultChk}>
                18+ required
              </Checkbox>
            </div>
          </div>

          <div className={cls(styles.discount_container, 'discount')}>
            <div className={styles.discount_group}>
              <ChkBox
                id="discount"
                labelText="Add discount"
                checked={discnt}
                onChange={onChangeChkBox}
              />
              <div className={styles.discount_wrapper}>
                <input
                  className={cls(styles.num_input, styles.discount_input)}
                  name="discountVal"
                  type="text"
                  disabled={!discnt}
                  ref={register({
                    required: false,
                    validate: (value) => value >= 0 && value <= 100,
                  })}
                />
                {_.get('discountVal.type', errors) === 'validate' && (
                  <p className={styles.errmsg}>0-100%</p>
                )}
                <span className={styles.percent}>%</span>
              </div>
            </div>
            <div className={styles.qty_group}>
              <div className={styles.discount_text}>If participants more than </div>
              <div className={styles.discount_wrapper}>
                <input
                  className={cls(styles.num_input, styles.qty_input)}
                  name="qtyVal"
                  type="text"
                  disabled={!discnt}
                  ref={register({
                    required: false,
                    validate: (value) => value >= 0,
                  })}
                />
                {_.get('qtyVal.type', errors) === 'validate' && (
                  <p className={styles.errmsg}>Number >= 0</p>
                )}
              </div>
            </div>
          </div>

          <div className={cls(styles.input_number, 'exp-input_number')}>
            <label className={styles.label}>Maximum no. of guest</label>
            <Controller
              control={control}
              name="Standardprice"
              rules={{ required: false }}
              render={({ onChange, value, name }) => (
                <InputNumber name={name} value={value} onChange={onChange} />
              )}
            />
          </div>

          <label className={styles.label}>Language</label>
          <div className={cls(styles.service_tags, 'exp_selects')}>
            <Select
              mode="tags"
              value={selectedLangs}
              onChange={handleChangeLangs}
              showArrow
              style={{ width: '100%' }}
            >
              {filteredLangs.map((item) => (
                <Select.Option key={item.id} value={item.tagName}>
                  {item.tagName}
                </Select.Option>
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
