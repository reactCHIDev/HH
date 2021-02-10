import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { getItem, setItem } from 'utils/localStorage'
import { Select, Slider, InputNumber, Checkbox } from 'antd'
import ChkBox from 'components/ChkBox'
import cls from 'classnames'
import _ from 'lodash/fp'
import { useForm, Controller } from 'react-hook-form'
import styles from './step2.module.scss'
import './step2.less'

const Step2 = (props) => {
  const { setStep, expTypes, expTags, stepper, setStepper } = props

  let title,
    expType,
    expTag,
    priceAdult,
    priceChild,
    isAdult,
    maxGuests,
    discount,
    duration,
    languages
  if (getItem('addExperience'))
    ({
      title,
      expType,
      expTag,
      duration,
      priceAdult,
      priceChild,
      isAdult,
      discount,
      maxGuests,
      languages,
    } = getItem('addExperience'))

  const [selectedTypes, setSelectedTypes] = useState(expType || [])
  const [selectedTags, setSelectedTags] = useState(expTag || [])
  const [dur, setDuration] = useState(duration || 20)
  const [adult, setIsAdult] = useState(isAdult || false)
  const [discnt, setDiscount] = useState(!!discount?.discount && !!discount?.quantity)
  const [discValue, setDiscountValue] = useState(discount?.discount)
  const [qtyValue, setQtyValue] = useState(discount?.quantity)
  const [selectedLangs, setSelectedLangs] = useState(languages || [])

  // =========================================================================

  const defaultValues = title
    ? {
        title,
        expType,
        expTag,
        duration,
        priceAdult,
        priceChild,
        isAdult,
        discountVal: discValue,
        qtyVal: qtyValue,
        maxGuests,
        languages,
      }
    : {}

  const { register, handleSubmit, control, watch, setValue, errors } = useForm({
    mode: 'onBlur',
    defaultValues,
  })

  // ===============================================

  const filteredTypes = expTypes?.length
    ? expTypes.filter((o) => !selectedTypes.includes(o.title))
    : []

  const handleChangeTypes = (onChange) => (e) => {
    setSelectedTypes(e)
    onChange(e)
  }

  const filteredTags = expTags?.length ? expTags.filter((o) => !selectedTags.includes(o.title)) : []

  const handleChangeTags = (onChange) => (e) => {
    setSelectedTags(e)
    onChange(e)
  }

  function formatter(value) {
    const time = value * 3 + 30
    const h = Math.floor(time / 60)
    const m = time % 60
    return `${h ? `${h}h` : ''} ${m ? `${m}m ` : ''}`
  }

  const onSlider = (value) => {
    setDuration(value)
  }

  const onChangeChkBox = () => setDiscount(!discnt)
  const isAdultChk = () => setIsAdult((a) => !a)

  const filteredLangs = ['English', 'Chinese', 'Japan', 'French', 'German', 'Spanish'].filter(
    (lang) => !selectedLangs.includes(lang),
  )

  const onLangSelect = (onChange) => (e) => {
    setSelectedLangs(e)
    onChange(e)
  }

  // ===============================================

  const onNext = (data) => {
    const step1 = getItem('addExperience')
    const { discountVal, qtyVal } = data
    delete data.discountVal
    delete data.qtyVal

    setItem('addExperience', {
      ...step1,
      ...data,
      discount: { quantity: discnt ? +qtyVal : 0, discount: discnt ? +discountVal : 0 },
      duration: dur,
      adult: isAdult,
    })
    setStep()
    setStepper(false)
  }

  const onChangeForm = () => {
    if (!stepper) setStepper(true)
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
            <Controller
              control={control}
              name="expType"
              rules={{ required: true, validate: (value) => value.length > 0 }}
              render={({ onChange, value, name }) => (
                <Select
                  name={name}
                  mode="multiple"
                  value={value}
                  onChange={handleChangeTypes(onChange)}
                  showArrow
                  style={{ width: '100%' }}
                >
                  {filteredTypes.map((item) => (
                    <Select.Option key={item.id} value={item.title}>
                      {item.title}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
            {_.get('expType.type', errors) === 'required' && (
              <p className={styles.errmsg}>This field is required</p>
            )}
            {_.get('expType.type', errors) === 'validate' && (
              <p className={styles.errmsg}>Select types</p>
            )}
          </div>

          <label className={styles.label}>Tags</label>
          <div className={cls(styles.service_tags, 'exp_selects')}>
            <Controller
              control={control}
              name="expTag"
              rules={{ required: true, validate: (value) => value.length > 0 }}
              render={({ onChange, value, name }) => (
                <Select
                  name={name}
                  mode="multiple"
                  value={value}
                  onChange={handleChangeTags(onChange)}
                  showArrow
                  style={{ width: '100%' }}
                >
                  {filteredTags.map((item) => (
                    <Select.Option key={item.id} value={item.title}>
                      {item.title}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
            {_.get('expTag.type', errors) === 'required' && (
              <p className={styles.errmsg}>This field is required</p>
            )}
            {_.get('expTag.type', errors) === 'validate' && (
              <p className={styles.errmsg}>Select tags</p>
            )}
          </div>

          <label className={styles.label}>Duration</label>
          <div className={cls(styles.slider_container, 'exp-slider')}>
            <Slider
              tipFormatter={formatter}
              value={dur}
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
                name="priceAdult"
                rules={{ required: true }}
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
              {_.get('priceAdult.type', errors) === 'required' && (
                <p className={styles.errmsg}>This field is required</p>
              )}
            </div>
            <div className={cls(styles.input_number, 'exp-input_number')}>
              <label className={styles.label}>Per child (age 6 - 16)</label>
              <Controller
                control={control}
                name="priceChild"
                rules={{ required: false }}
                render={({ onChange, value, name }) => (
                  <>
                    <InputNumber
                      name={name}
                      value={value}
                      onChange={onChange}
                      disabled={adult}
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    />
                  </>
                )}
              />
            </div>

            <div>
              <Checkbox checked={adult} onChange={isAdultChk}>
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
                    required: discnt,
                    validate: (value) => value >= 0 && value <= 100,
                  })}
                />
                {_.get('discountVal.type', errors) === 'validate' && (
                  <p className={styles.errmsg}>0-100%</p>
                )}
                {_.get('discountVal.type', errors) === 'required' && (
                  <p className={styles.errmsg}>required</p>
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
                    required: discnt,
                    validate: (value) => value >= 0,
                  })}
                />
                {_.get('qtyVal.type', errors) === 'validate' && (
                  <p className={styles.errmsg}>Number >= 0</p>
                )}
                {_.get('qtyVal.type', errors) === 'required' && (
                  <p className={styles.errmsg}>required</p>
                )}
              </div>
            </div>
          </div>

          <div className={cls(styles.input_number, 'exp-input_number')}>
            <label className={styles.label}>Maximum no. of guest</label>
            <Controller
              control={control}
              name="maxGuests"
              rules={{ required: true }}
              render={({ onChange, value, name }) => (
                <InputNumber name={name} value={value} onChange={onChange} />
              )}
            />
            {_.get('maxGuests.type', errors) === 'required' && (
              <p className={styles.errmsg}>This field is required</p>
            )}
          </div>

          <label className={styles.label}>Language</label>
          <div className={cls(styles.service_tags, 'exp_selects')}>
            <Controller
              control={control}
              name="languages"
              rules={{ required: true, validate: (value) => value.length > 0 }}
              render={({ onChange, value, name }) => (
                <Select
                  mode="tags"
                  onChange={onLangSelect(onChange)}
                  name={name}
                  value={value}
                  showArrow
                  style={{ width: '100%' }}
                >
                  {filteredLangs.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
            {_.get('languages.type', errors) === 'required' && (
              <p className={styles.errmsg}>This field is required</p>
            )}
            {_.get('languages.type', errors) === 'validate' && (
              <p className={styles.errmsg}>Select languages</p>
            )}
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
