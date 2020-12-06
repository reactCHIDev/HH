import React, { useEffect, useState } from 'react'
import T, { shape } from 'prop-types'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Divider,
  DatePicker,
  Select,
  Row,
  Checkbox,
  Button,
} from 'antd'
import moment from 'moment'

import { getItem, setItem } from 'utils/localStorage'

import cls from 'classnames'
import { MinusCircleOutlined } from '@ant-design/icons'
import styles from './step4.module.scss'
import './step4.less'

const { Option } = Select
const { RangePicker } = DatePicker

const Step4 = ({ create, countries, tags, edit = false }) => {
  const prevState = getItem('addProduct')

  const normalizeTagsDefaults = (value) => value.map((t) => tags.find((e) => e.id === t).tagName)

  const [ingredients, setIngredients] = useState(!!prevState?.ingredients)
  const [selectedItems, setSelectedItems] = useState(
    prevState?.productTagIds && prevState?.productTagIds.length
      ? normalizeTagsDefaults(prevState?.productTagIds)
      : [],
  )
  const [selectedRegionRadio, setSelectedRegionRadio] = useState(
    prevState?.deliveryRegion
      ? prevState.deliveryRegion === 'Local'
        ? 1
        : prevState.deliveryRegion === 'Worldwide'
        ? 2
        : 3
      : prevState?.deliveryRegion === ''
      ? 3
      : 1,
  )
  const [selectedCountryRadio, setSelectedCountryRadio] = useState(
    prevState?.deliveryRegionException && prevState.deliveryRegionException.length ? 5 : 4,
  )
  const [selectedCountries, setSelectedCountries] = useState(
    selectedRegionRadio === 3
      ? selectedCountryRadio === 4
        ? prevState?.deliveryRegion && prevState.deliveryRegion.split(' ')
        : prevState?.deliveryRegionException && prevState.deliveryRegionException.split(' ')
      : [],
  )
  const [availabilityStartDate, setStartDate] = useState(prevState?.availabilityStartDate)
  const [availabilityEndDate, setEndDate] = useState(prevState?.availabilityEndDate)
  const [isAdult, setIsAdult] = useState(!!prevState?.isAdult)
  const [dates, setDates] = useState(prevState?.available !== 'Preorder')
  const [isQuantity, setIsQuantity] = useState(!!prevState?.quantity)

  useEffect(() => {}, [])

  const normalizeTags = (value) => value.map((t) => tags.find((e) => e.tagName === t).id)

  const onFinish = (vals) => {
    const values = { ...vals }

    // ================

    let deliveryRegion = ''
    let deliveryRegionException = ''
    if (selectedRegionRadio < 3) {
      const deliveryRegionData = { '1': 'Local', '2': 'Worldwide' }
      deliveryRegion = deliveryRegionData[selectedRegionRadio]
    } else {
      if (selectedCountryRadio == 4) deliveryRegion = selectedCountries.join(' ')
      if (selectedCountryRadio == 5) deliveryRegionException = selectedCountries.join(' ')
    }

    // =================

    if (!ingredients || values.ingredients.trim() === '') {
      delete values.ingredients
    }

    // =================

    const productTagIds = normalizeTags(selectedItems)

    // =================

    if (!isQuantity) {
      delete values.quantity
    }

    // =================

    const formData = {
      ...values,
      isAdult,
      deliveryRegion,
      deliveryRegionException,
      // deliveryMethod,
      productTagIds,
    }

    if (availabilityStartDate && availabilityEndDate) {
      formData.availabilityStartDate = availabilityStartDate
      formData.availabilityEndDate = availabilityEndDate
    }

    const prevStep = getItem('addProduct')
    delete prevStep.ingredients
    const productData = { ...prevStep, ...formData }
    setItem('addProduct', productData)
    delete productData.countries
    create(productData)
  }

  function onFieldChange(vals) {
    const values = { ...vals }

    // ================

    let deliveryRegion = ''
    let deliveryRegionException = ''
    if (selectedRegionRadio < 3) {
      const deliveryRegionData = { '1': 'Local', '2': 'Worldwide' }
      deliveryRegion = deliveryRegionData[selectedRegionRadio]
    } else {
      if (selectedCountryRadio == 4) deliveryRegion = selectedCountries.join(' ')
      if (selectedCountryRadio == 5) deliveryRegionException = selectedCountries.join(' ')
    }

    // =================

    if (!ingredients || values.ingredients.trim() === '') {
      delete values.ingredients
    }

    // =================

    const productTagIds = normalizeTags(selectedItems)

    // =================

    if (!isQuantity) {
      delete values.quantity
    }

    // =================

    const formData = {
      ...values,
      isAdult,
      deliveryRegion,
      deliveryRegionException,
      // deliveryMethod,
      productTagIds,
    }

    if (availabilityStartDate && availabilityEndDate) {
      formData.availabilityStartDate = availabilityStartDate
      formData.availabilityEndDate = availabilityEndDate
    }

    const prevStep = getItem('addProduct')
    delete prevStep.ingredients
    const productData = { ...prevStep, ...formData }
    setItem('addProduct', productData)
  }

  const onRegionRadio = (e) => {
    setSelectedRegionRadio(e.target.value)
  }

  const onCountryRadio = (e) => {
    setSelectedCountryRadio(e.target.value)
  }

  const ingredientsChk = () => setIngredients((i) => !i)

  const isAdultChk = () => setIsAdult((a) => !a)
  const isQuantityChk = () => setIsQuantity((a) => !a)

  const handleChangeTags = (selectedItms) => {
    setSelectedItems(selectedItms)
  }

  const handleChangeCountryTags = (selectedItms) => {
    setSelectedCountries(selectedItms)
  }

  const filteredTags = tags.filter((o) => !selectedItems.includes(o.tagName))

  const COUNTRIES = countries.map((e) => e.countryName)
  let filteredCountries = COUNTRIES
  if (selectedCountries && selectedCountries.length) {
    filteredCountries = COUNTRIES.filter((o) => !selectedCountries.includes(o))
  }

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }

  const onChangeStartDate = (e) => {
    setStartDate(new Date(e).toISOString())
  }
  const onChangeEndDate = (e) => {
    setEndDate(new Date(e).toISOString())
  }

  const toggleDates = (e) => {
    setDates(e.target.value !== 'Preorder')
  }

  const onValuesChange = (f, all) => {
    onFieldChange(all)
  }

  return (
    <div className={styles.container}>
      <div className={cls(styles.content, 'add_form')}>
        <p className={styles.header}>Additional information</p>
        <Form
          layout="vertical"
          name="register"
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          initialValues={{
            parameters: prevState?.parameters || [{ measure: 'ml', currency: '$' }],
            ingredients: prevState?.ingredients || ' ',
            productTagIds: selectedItems,
            countries: selectedCountries,
            quantity: prevState?.quantity,
            available: prevState?.available,
            refundPolicy: prevState?.refundPolicy,
            refundPolicyNote: prevState?.refundPolicyNote,
          }}
          scrollToFirstError
        >
          <Form.List name="parameters">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Row key={field.key}>
                    <div key={field.key} className={styles.items_wrapper}>
                      <div className={styles.formlist_item}>
                        <div className={cls(styles.num_selector, 'numeric_selector')}>
                          <Form.Item
                            shouldUpdate
                            {...field}
                            key={[field.name, 'volume']}
                            name={[field.name, 'volume']}
                            fieldKey={[field.fieldKey, 'volume']}
                            rules={[{ required: true, message: 'Please input volume!' }]}
                          >
                            <InputNumber min={0} max={99999} />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            key={[field.name, 'measure']}
                            name={[field.name, 'measure']}
                            fieldKey={[field.fieldKey, 'measure']}
                            rules={[{ required: true, message: 'Please input volume!' }]}
                          >
                            <Select
                              style={{
                                width: 70,
                              }}
                            >
                              <Option value="g">g</Option>
                              <Option value="kg">kg</Option>
                              <Option value="ml">ml</Option>
                              <Option value="l">lg</Option>
                              <Option value="S">S</Option>
                              <Option value="M">M</Option>
                              <Option value="L">L</Option>
                              <Option value="L">none</Option>
                            </Select>
                          </Form.Item>
                        </div>

                        <div className="numeric_selector">
                          <Form.Item
                            {...field}
                            key={[field.name, 'price']}
                            name={[field.name, 'price']}
                            fieldKey={[field.fieldKey, 'price']}
                            rules={[{ required: true, message: 'Please input price!' }]}
                          >
                            <InputNumber min={0} max={999999999999} />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            key={[field.name, 'currency']}
                            name={[field.name, 'currency']}
                            fieldKey={[field.fieldKey, 'currency']}
                            rules={[{ required: true, message: 'Please choose currency!' }]}
                          >
                            <Select
                              style={{
                                width: 70,
                              }}
                            >
                              <Option value="$">$</Option>
                              <Option value="E">E</Option>
                              <Option value="Y">Y</Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className={styles.delBtn}>
                        {field.key > 0 && (
                          <MinusCircleOutlined onClick={() => remove(field.name)} />
                        )}
                      </div>
                    </div>
                  </Row>
                ))}
                <div className={cls(styles.add_btn_wrapper, 'add_btn')}>
                  <Button onClick={() => add()}>ADD</Button>
                </div>
              </>
            )}
          </Form.List>

          <div className={styles.ingr_wrapper}>
            <div className={styles.ingr_chk}>
              <Checkbox checked={ingredients} onChange={ingredientsChk}>
                Ingredients
              </Checkbox>
            </div>
            <div className={styles.ingr_text}>
              <Form.Item name="ingredients">
                <Input.TextArea rows={4} disabled={!ingredients} />
              </Form.Item>
            </div>
          </div>

          <label className="form-text">Tags</label>
          <Form.Item
            name="productTagIds"
            rules={[
              { required: true, type: 'array', min: 2, message: 'Please choose at least 2 tags!' },
            ]}
            wrapperCol={{ span: 24, offset: 0 }}
          >
            <Select
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
          </Form.Item>

          <Radio.Group onChange={onRegionRadio} value={selectedRegionRadio}>
            <Radio style={radioStyle} value={1}>
              Local
            </Radio>
            <Radio style={radioStyle} value={2}>
              Worldwide
            </Radio>
            <Radio style={radioStyle} value={3}>
              Select countries
            </Radio>
          </Radio.Group>

          <div style={{ padding: '5px 0 0 24px' }}>
            <Radio.Group
              onChange={onCountryRadio}
              value={selectedCountryRadio}
              disabled={selectedRegionRadio < 3}
              style={{ width: '100%' }}
            >
              <Radio style={radioStyle} value={4}>
                Available countries
              </Radio>
              <Form.Item
                name="countries"
                rules={[
                  { required: selectedRegionRadio === 3, message: 'Please select countries!' },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Inserted are removed"
                  value={selectedCountries}
                  onChange={handleChangeCountryTags}
                  showArrow
                  disabled={selectedCountryRadio < 3}
                  style={{ width: '100%' }}
                >
                  {filteredCountries.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Radio style={radioStyle} value={5}>
                Worldwide, except
              </Radio>
            </Radio.Group>
          </div>

          <Divider />

          <p className={styles.header}>Availability</p>

          <div className={styles.available}>
            <Form.Item name="available" rules={[{ required: true, message: 'Required field' }]}>
              <Radio.Group onChange={toggleDates}>
                <Radio style={radioStyle} value="Available">
                  Available now
                </Radio>
                <Radio style={radioStyle} value="Preorder">
                  Pre-order
                </Radio>
              </Radio.Group>
            </Form.Item>
            <div className={styles.datepicker_wrapper}>
              <div className={styles.datepicker_group}>
                <DatePicker
                  defaultValue={moment(availabilityStartDate)}
                  disabled={dates}
                  id="1"
                  format="DD MMM YY"
                  onChange={onChangeStartDate}
                />
                <span className={styles.dash}>{' - '}</span>
                <DatePicker
                  defaultValue={moment(availabilityEndDate)}
                  disabled={dates}
                  id="2"
                  format="DD MMM YY"
                  onChange={onChangeEndDate}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <Checkbox checked={isQuantity} onChange={isQuantityChk}>
              Quantity (optional)
            </Checkbox>
            <div className={styles.quantity_container}>
              <Form.Item
                name="quantity"
                rules={[{ required: false, message: 'Please enter quantity' }]}
                normalize={(value) => Math.abs(Number(value))}
              >
                <InputNumber disabled={!isQuantity} min={0} />
              </Form.Item>
            </div>
          </div>

          <div>
            <Checkbox checked={isAdult} onChange={isAdultChk}>
              Verify customer is over 18 years old
            </Checkbox>
          </div>

          <Divider />

          <p className={styles.header}>Refund policy</p>
          <Form.Item
            name="refundPolicy"
            rules={[{ required: true, message: 'Please choose refund policy' }]}
          >
            <Radio.Group>
              <Radio style={radioStyle} value="FULL_REFUND">
                Full refund
              </Radio>
              <Radio style={radioStyle} value="NO_REFUND">
                Non-refundable
              </Radio>
            </Radio.Group>
          </Form.Item>

          <label className="form-text">Note</label>
          <Form.Item name="refundPolicyNote">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block size="large" htmlType="submit">
              {edit ? 'SAVE CHANGES' : 'PUBLISH'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

Step4.propTypes = {
  create: T.func.isRequired,
  tags: T.arrayOf(shape()).isRequired,
  countries: T.arrayOf(shape()).isRequired,
}

export default Step4
