/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
/* eslint-disable react/prop-types */
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

  let title, typeIds, tagIds, priceAdult, priceChild, isAdult, guests, discount, duration, languages
  const prevData = getItem('addExperience')
  if (prevData)
    ({
      title,
      typeIds,
      tagIds,
      duration,
      priceAdult,
      priceChild,
      isAdult,
      discount,
      guests,
      languages,
    } = getItem('addExperience'))

  const normalizeTypesForSubmit = (value, allTags) =>
    value.map((t) => allTags.find((e) => e.title === t).id)

  const normalizeTypesForRender = (value, allTags) =>
    value.map((t) => allTags.find((e) => e.id === t).title)

  const normalizeTagsForSubmit = (value, allTags) =>
    value.map((t) => allTags.find((e) => e.tagName === t).id)

  const normalizeTagsForRender = (value, allTags) =>
    value.map((t) => allTags.find((e) => e.id === t).tagName)

  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [dur, setDuration] = useState(duration || 12)
  const [adult, setIsAdult] = useState(isAdult || false)
  const [discnt, setDiscount] = useState(!!discount?.discount && !!discount?.quantity)
  const [discValue, setDiscountValue] = useState(discount?.discount)
  const [qtyValue, setQtyValue] = useState(discount?.quantity)
  const [selectedLangs, setSelectedLangs] = useState(languages || [])
  const [defaultValues, setDefaultValues] = useState({})

  // =========================================================================

  useEffect(() => {
    if (expTypes.length && expTags.length && typeIds && tagIds) {
      setSelectedTypes(normalizeTypesForRender(typeIds, expTypes))
      setSelectedTags(normalizeTagsForRender(tagIds, expTags))
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (prevData) {
      setDefaultValues({
        title,
        typeIds: typeIds ? normalizeTypesForRender(typeIds, expTypes) : [],
        tagIds: tagIds ? normalizeTagsForRender(tagIds, expTags) : [],
        duration,
        priceAdult,
        priceChild,
        isAdult,
        discountVal: discValue,
        qtyVal: qtyValue,
        guests: Number(guests),
        languages,
      })
    }
    // eslint-disable-next-line
  }, [])

  const { register, handleSubmit, control, setValue, errors } = useForm({
    mode: 'onBlur',
    defaultValues,
  })

  useEffect(() => {
    if (Object.keys(defaultValues).length) {
      Object.keys(defaultValues).forEach((k) => setValue(k, defaultValues[k]))
    }
    // eslint-disable-next-line
  }, [defaultValues])

  // ===============================================

  const filteredTypes = expTypes?.length
    ? expTypes.filter((o) => !selectedTypes.includes(o.title))
    : []

  const handleChangeTypes = (onChange) => (e) => {
    setSelectedTypes(e)
    onChange(e)
  }

  const filteredTags = expTags?.length
    ? expTags.filter((o) => !selectedTags.includes(o.tagName))
    : []

  const handleChangeTags = (onChange) => (e) => {
    setSelectedTags(e)
    onChange(e)
  }

  function formatter(value) {
    const time = value * 5 + 30
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
    const { discountVal, qtyVal, typeIds, tagIds } = data
    delete data.discountVal
    delete data.qtyVal
    delete data.typeIds
    delete data.tagIds
    if (adult) {
      delete data.priceChild
      delete step1.priceChild
    }

    setItem('addExperience', {
      ...step1,
      ...data,
      typeIds: normalizeTypesForSubmit(typeIds, expTypes),
      tagIds: normalizeTagsForSubmit(tagIds, expTags),
      discount: {
        quantity: discnt ? Number(qtyVal) : 0,
        discount: discnt ? Number(discountVal) : 0,
      },
      duration: dur,
      // adult: isAdult,
      currency: 'HKD',
      isAdult: adult,
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
              name="typeIds"
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
            {_.get('typeIds.type', errors) === 'required' && (
              <p className={styles.errmsg}>This field is required</p>
            )}
            {_.get('typeIds.type', errors) === 'validate' && (
              <p className={styles.errmsg}>Select types</p>
            )}
          </div>

          <label className={styles.label}>Tags</label>
          <div className={cls(styles.service_tags, 'exp_selects')}>
            <Controller
              control={control}
              name="tagIds"
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
                    <Select.Option key={item.id} value={item.tagName}>
                      {item.title}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
            {_.get('tagIds.type', errors) === 'required' && (
              <p className={styles.errmsg}>This field is required</p>
            )}
            {_.get('tagIds.type', errors) === 'validate' && (
              <p className={styles.errmsg}>Select tags</p>
            )}
          </div>

          <label className={styles.label}>Duration</label>
          <div className={cls(styles.slider_container, 'exp-slider')}>
            <Slider
              tipFormatter={formatter}
              value={dur}
              onChange={onSlider}
              step={6}
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
                    min="0"
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
                      min="0"
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
              name="guests"
              rules={{ required: true }}
              render={({ onChange, value, name }) => (
                <InputNumber name={name} value={value} min="0" onChange={onChange} />
              )}
            />
            {_.get('guests.type', errors) === 'required' && (
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
