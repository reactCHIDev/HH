import React, { useState } from 'react'
import T from 'prop-types'
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

const Step4 = (props) => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker

  const [ingredients, setIngredients] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [selectedRegionRadio, setSelectedRegionRadio] = useState([])
  const [selectedCountryRadio, setSelectedCountryRadio] = useState([])
  const [delivery, setDelivery] = useState({})

  const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']
  const COUNTRIES = ['China', 'Malaysia', 'Japan', 'Vietnam']

  const onFinish = (values) => {
    console.log('Received values of form: ', { ...values, chkIngr: ingredients })
  }

  const onRegionRadio = (e) => {
    setSelectedRegionRadio(e.target.value)
  }

  const onCountryRadio = (e) => {
    setSelectedCountryRadio(e.target.value)
  }

  const ingredientsChk = () => setIngredients((i) => !i)

  const handleChangeTags = (selectedItms) => {
    setSelectedItems(selectedItms)
  }

  const handleChangeCountryTags = (selectedItms) => {
    setSelectedCountries(selectedItms)
  }

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))
  const filteredCountries = COUNTRIES.filter((o) => !selectedCountries.includes(o))

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }

  const [autoCompleteResult, setAutoCompleteResult] = useState([])

  const onChange = () => {}

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
            order: [{ ed: 'ml', currency: '$' }],
            ed: 'cl',
            ed2: '$',
          }}
          scrollToFirstError
        >
          <Form.List name="order">
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
                          rules={[{ required: false, message: 'Please input volume!' }]}
                        >
                          <InputNumber min={0} max={99999} onChange={onChange} />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          key={[field.name, 'ed']}
                          name={[field.name, 'ed']}
                          fieldKey={[field.fieldKey, 'ed']}
                          rules={[{ required: false, message: 'Please input volume!' }]}
                        >
                          <Select
                            style={{
                              width: 70,
                            }}
                          >
                            <Option value="g">ml</Option>
                            <Option value="kg">cl</Option>
                            <Option value="ml">ml</Option>
                            <Option value="l">cl</Option>
                            <Option value="S">l</Option>
                            <Option value="M">ml</Option>
                            <Option value="L">cl</Option>
                          </Select>
                        </Form.Item>
                      </div>

                      <div className="numeric_selector">
                        <Form.Item
                          {...field}
                          key={[field.name, 'money']}
                          name={[field.name, 'money']}
                          fieldKey={[field.fieldKey, 'money']}
                          rules={[{ required: false, message: 'Please input volume!' }]}
                        >
                          <InputNumber min={0} max={999999999999} onChange={onChange} />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          key={[field.name, 'currency']}
                          name={[field.name, 'currency']}
                          fieldKey={[field.fieldKey, 'currency']}
                          rules={[{ required: false, message: 'Please choose currency!' }]}
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
            <Col flex="150px" wrap={false}>
              <Checkbox checked={ingredients} onChange={ingredientsChk}>
                Ingredients
              </Checkbox>
            </Col>
            <Col flex="auto">
              <Form.Item name="ingredients" wrapperCol={{ span: 24, offset: 0 }}>
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="tags" wrapperCol={{ span: 24, offset: 0 }}>
            <Select
              mode="multiple"
              placeholder="Inserted are removed"
              value={selectedItems}
              onChange={handleChangeTags}
              showArrow
              style={{ width: '100%' }}
            >
              {filteredOptions.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
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

          <p className={styles.header}>Delivery method</p>
          <Row>
            <Col sm={12} md={12}>
              <Form.Item name="standart">
                <Checkbox checked={true} onChange={onChange}>
                  Standart
                </Checkbox>
                <div style={{ padding: '5px 0 0 24px' }}>
                  <span className="form-text">
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
                  </span>
                  <InputNumber
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={onChange}
                  />
                </div>
              </Form.Item>
            </Col>
            <Col sm={12} md={12}>
              <Form.Item name="standart">
                <Checkbox checked={true} onChange={onChange}>
                  Pick-up
                </Checkbox>
                <div style={{ padding: '5px 0 0 24px' }}>
                  <span className="form-text">
                    Sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </span>
                  <Input />
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12}>
              <Form.Item name="standart">
                <Checkbox checked={true} onChange={onChange}>
                  Express
                </Checkbox>
                <div style={{ padding: '5px 0 0 24px' }}>
                  <span className="form-text">
                    Sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </span>
                  <InputNumber
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={onChange}
                  />
                </div>
              </Form.Item>
            </Col>
            <Col sm={12} md={12}>
              <Form.Item name="standart">
                <Checkbox checked={true} onChange={onChange}>
                  Free
                </Checkbox>
                <div style={{ padding: '5px 0 0 24px' }}>
                  <span className="form-text">
                    Sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </span>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <p className={styles.header}>Availability</p>

          <Row gutter={20} align="bottom">
            <Col gutter={20}>
              <Form.Item name="availability" wrapperCol={{ span: 24, offset: 0 }}>
                <Radio.Group onChange={onRegionRadio} value={selectedRegionRadio}>
                  <Radio style={radioStyle} value={1}>
                    Available now
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    Pre-order
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <DatePicker onChange={onChange} />
              <span>{' - '}</span>
              <DatePicker onChange={onChange} />
            </Col>
            <Col gutter={20} align="bottom">
              <span className="form-text">Over 18 Requirement </span>
              <Checkbox checked={true} onChange={onChange}>
                Verify customer is over 18 years old
              </Checkbox>
            </Col>
          </Row>

          <div style={{ marginTop: 20 }}>
            <Checkbox checked={true} onChange={onChange}>
              Quantity (optional)
            </Checkbox>
            <div style={{ padding: '5px 0 0 24px' }}>
              <InputNumber onChange={onChange} />
            </div>
          </div>

          <Divider />

          <p className={styles.header}>Refund policy</p>
          <Form.Item name="refund">
            <Radio.Group onChange={onRegionRadio} value={selectedRegionRadio}>
              <Radio style={radioStyle} value={1}>
                Full refund
              </Radio>
              <Radio style={radioStyle} value={2}>
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
  setStep: T.func.isRequired,
}

export default Step4
