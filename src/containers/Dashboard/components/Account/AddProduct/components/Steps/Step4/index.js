import React, { useState } from 'react'
import T, { shape } from 'prop-types'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Divider,
  DatePicker,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Space,
} from 'antd'
import moment from 'moment'
import { getItem, setItem } from 'utils/localStorage'

import cls from 'classnames'
import { QuestionCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './step4.module.scss'
import './step4.less'

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 },
}
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const Step4 = ({ create, pushRoute, tags }) => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker

  const [ingredients, setIngredients] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [selectedRegionRadio, setSelectedRegionRadio] = useState(1)
  const [selectedCountryRadio, setSelectedCountryRadio] = useState(1)
  const [availabilityStartDate, setStartDate] = useState('')
  const [availabilityEndDate, setEndDate] = useState('')
  const [isAdult, setIsAdult] = useState(false)
  const [dates, setDates] = useState('Available')

  const OPTIONS = [
    { id: 1, tagName: 'Drink' },
    { id: 2, tagName: 'Salad' },
    { id: 3, tagName: 'Bread' },
    { id: 4, tagName: 'Soup' },
    { id: 5, tagName: 'Pasta' },
  ]

  const normalizeTags = (value) => value.map((t) => tags.find((e) => e.tagName === t).id)

  const COUNTRIES = ['China', 'Malaysia', 'Japan', 'Vietnam']

  const onFinish = (vals) => {
    console.log('Received values of form: ', { ...vals, chkIngr: ingredients })

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
    console.log('%c   productData   ', 'color: white; background: royalblue;', productData)
    create(productData)
    pushRoute('/card')
  }

  const onRegionRadio = (e) => {
    setSelectedRegionRadio(e.target.value)
  }

  const onCountryRadio = (e) => {
    setSelectedCountryRadio(e.target.value)
  }

  const ingredientsChk = () => setIngredients((i) => !i)

  const isAdultChk = () => setIsAdult((a) => !a)

  const handleChangeTags = (selectedItms) => {
    console.log('%c     selectedItms ', 'color: darkgreen; background: palegreen;', selectedItms)
    setSelectedItems(selectedItms)
  }

  const handleChangeCountryTags = (selectedItms) => {
    setSelectedCountries(selectedItms)
  }

  const filteredTags = tags.filter((o) => !selectedItems.includes(o.id))
  const filteredCountries = COUNTRIES.filter((o) => !selectedCountries.includes(o))

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
    console.log('%c   value   ', 'color: white; background: salmon;', e)
    setDates(e.target.value !== 'Preorder')
  }

  return (
    <div className={styles.container}>
      <div className={cls(styles.content, 'add_form')}>
        <p className={styles.header}>Additional information</p>
        <Form
          {...formItemLayout}
          form={form}
          layout="vertical"
          name="register"
          onFinish={onFinish}
          initialValues={{
            parameters: [{ measure: 'ml', currency: '$' }],
            available: 'Available',
            refundPolicy: 'FULL_REFUND',
          }}
          scrollToFirstError
        >
          <Form.List name="parameters">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Row key={field.key}>
                    <Space align="baseline">
                      <div className="numeric_selector">
                        <Form.Item
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
                            <Option value="l">l</Option>
                            <Option value="S">S</Option>
                            <Option value="M">M</Option>
                            <Option value="L">L</Option>
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

                      {field.key > 0 && <MinusCircleOutlined onClick={() => remove(field.name)} />}
                    </Space>
                  </Row>
                ))}

                <Form.Item>
                  <Button onClick={() => add()} icon={<PlusOutlined />}>
                    ADD
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Row>
            <Col flex="150px">
              <Checkbox checked={ingredients} onChange={ingredientsChk}>
                Ingredients
              </Checkbox>
            </Col>
            <Col flex="auto">
              <Form.Item name="ingredients" wrapperCol={{ span: 24, offset: 0 }}>
                <Input.TextArea rows={4} disabled={!ingredients} />
              </Form.Item>
            </Col>
          </Row>

          <label className="form-text">Tags</label>
          <Form.Item
            name="productTagIds"
            rules={[
              { required: true, type: 'array', min: 2, message: 'Please choose at least 2 tags!' },
            ]}
            wrapperCol={{ span: 24, offset: 0 }}
          >
            <Select
              mode="tags"
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
              <Select
                mode="multiple"
                placeholder="Inserted are removed"
                value={selectedCountries}
                onChange={handleChangeCountryTags}
                showArrow
                disabled={selectedCountryRadio !== 4}
                style={{ width: '100%' }}
              >
                {filteredCountries.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
              <Radio style={radioStyle} value={5}>
                Worldwide, except
              </Radio>
            </Radio.Group>
          </div>

          <Divider />

          <p className={styles.header}>Availability</p>

          <Row gutter={20} align="bottom">
            <Col gutter={20}>
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

              <DatePicker disabled={dates} id="1" format="DD MMM YY" onChange={onChangeStartDate} />
              <span>{' - '}</span>
              <DatePicker disabled={dates} id="2" format="DD MMM YY" onChange={onChangeEndDate} />
            </Col>
            <Col gutter={20} align="bottom">
              <span className="form-text">Over 18 Requirement </span>
              <Checkbox checked={isAdult} onChange={isAdultChk}>
                Verify customer is over 18 years old
              </Checkbox>
            </Col>
          </Row>

          <div style={{ marginTop: 20 }}>
            <label className="form-text">Quantity</label>
            <Form.Item
              name="quantity"
              rules={[{ required: true, message: 'Please enter quantity' }]}
              normalize={(value) => Math.abs(Number(value))}
            >
              <div style={{ padding: '5px 0 0 24px' }}>
                <InputNumber min={0} />
              </div>
            </Form.Item>
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

          <Form.Item {...tailFormItemLayout} wrapperCol={2}>
            <Button type="primary" block size="large" htmlType="submit">
              PUBLISH
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

Step4.propTypes = {
  create: T.func.isRequired,
  pushRoute: T.func.isRequired,
  tags: T.arrayOf(shape()).isRequired,
}

export default Step4
