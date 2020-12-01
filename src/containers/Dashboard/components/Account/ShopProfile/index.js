import React, { useState, useEffect } from 'react'
import T from 'prop-types'

import { getUserAccount, updateAccount } from 'actions/account'
import { updateFoodmakerAccountAC } from 'actions/foodmaker'
import { getServiceTagsAC, getSpecialityTagsAC, getProductTagsRequestAC } from 'actions/system'
import cls from 'classnames'
import QR from 'qrcode'
import AvaUploader from 'components/AvatarUploader'

import ImgCrop from 'antd-img-crop'
import Btn from 'components/Button'
import { Input, Select, Button, Form, Upload, Modal, Checkbox, InputNumber, Progress } from 'antd'
import { PlusOutlined, LockOutlined } from '@ant-design/icons'

import { connect } from 'react-redux'
import axios from 'axios'

import styles from './shopprofile.module.scss'
import './shopprofile.less'

const ShopProfile = (props) => {
  const {
    account,
    serviceTags,
    specialityTags,
    productTags,
    getUserAccount,
    getServiceTagsAC,
    getSpecialityTagsAC,
    getProductTagsRequestAC,
  } = props

  const { id, success } = account

  const [avatar, setAvatar] = useState('')
  const [tags, setTags] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedLangs, setSelectedLangs] = useState([])

  const [qrImgSource, setQrImgSource] = useState(null)

  const [hungryHuggerLink, setSiteValue] = useState('www.hungryhugger.com/shop/')

  const [standart, setStandart] = useState(true)
  const [freepick, setFreepick] = useState(false)
  const [express, setExpress] = useState(false)
  const [free, setFree] = useState(false)

  const onChangeStandartChkBox = (e) => setStandart(e.target.checked)
  const onChangeFreePickChkBox = (e) => setFreepick(e.target.checked)
  const onChangeExpressChkBox = (e) => setExpress(e.target.checked)
  const onChangeFreeChkBox = (e) => setFree(e.target.checked)

  const generateQR = async (text) => {
    try {
      const qr = await QR.toDataURL(text)
      setQrImgSource(qr)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChangeTags = (selectedItms) => {
    setSelectedItems(selectedItms)
  }

  const normalizeTagsForSubmit = (value, allTags) =>
    value.map((t) => allTags.find((e) => e.tagName === t).id)

  const normalizeTagsForRender = (value, allTags) =>
    value.map((t) => allTags.find((e) => e.id === t).tagName)

  const filteredTags = tags.length ? tags.filter((o) => !selectedItems.includes(o.tagName)) : []

  useEffect(() => {
    // if (id) getUserAccount(id)
    getServiceTagsAC()
    getSpecialityTagsAC()
    getProductTagsRequestAC()
  }, [])

  useEffect(() => {
    /* if (account.hungryHuggerLink)
      setSiteValue(
        account.hungryHuggerLink.replace(
          'https://hungryhugger.wildwebart.com',
          'www.hungryhugger.com',
        ),
      ) */
  }, [account])

  useEffect(() => {
    if (
      serviceTags &&
      serviceTags.length &&
      specialityTags &&
      specialityTags.length &&
      productTags &&
      productTags.length
    ) {
      setTags([...specialityTags, ...productTags])
      setSelectedItems(normalizeTagsForRender([1, 3, 5], [...specialityTags, ...productTags]))
    }
  }, [serviceTags, specialityTags, productTags])

  useEffect(() => {
    generateQR(hungryHuggerLink)
  }, [hungryHuggerLink])

  useEffect(() => {
    if (success) {
      // if (id) getUserAccount(id)
    }
  }, [success])

  const onSubmit = (formValues) => {
    const userPhoto = avatar

    const values = { ...formValues }

    if (!standart) {
      delete values.standartCost
      delete values.standartFreeEdge
      delete values.standartNotes
    }
    if (!freepick) {
      delete values.freePickNote
    }
    if (!express) {
      delete values.expressCost
      delete values.expressFreeEdge
      delete values.expressNotes
    }
    if (!free) {
      delete values.freeMinimum
    }

    const payload = {
      ...values,
      userPhoto,
      hungryHuggerLink,
    }

    Object.keys(payload).forEach((f) => {
      if (!payload[f] || payload[f].length === 0) delete payload[f]
    })
    console.log('%c  payload    ', 'color: darkgreen; background: palegreen;', payload)
    // updateFoodmakerAccountAC(payload)
  }

  const { reffering, firstName, lastName, about } = account

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Form
          layout="vertical"
          name="fmProfile"
          onFinish={onSubmit}
          initialValues={{
            reffering,
            firstName: firstName,
            lastName,
            about,
          }}
          scrollToFirstError
        >
          <div className={styles.name_section}>
            <div className={styles.name_item}>
              <p className={styles.title}>Shop name</p>

              <div className={styles.first_name}>
                <label className={styles.label}>The shop name will be visible to everyone</label>
                <Form.Item name="shopName">
                  <Input />
                </Form.Item>
              </div>
            </div>

            <div className={styles.url_item}>
              <p className={styles.title}>Shop url</p>
              <div className={styles.profile_url}>
                <div className={styles.profile_data}>
                  <div className={styles.url_name}>
                    <label className={styles.label}>Generated automatically</label>
                    <Input value={hungryHuggerLink} suffix={<LockOutlined />} />
                  </div>

                  {hungryHuggerLink && (
                    <div className={styles.qr}>
                      <a className={styles.qr_wrapper} href={qrImgSource} download="qr.png">
                        <img className={styles.qr_img} src={qrImgSource} alt="qr" />
                      </a>
                      <div className={styles.qr_link}>
                        <div className={styles.link_title}>Your qr-code</div>
                        <a className={styles.link_link} href={qrImgSource} download="qr.png">
                          Download
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.about_section}>
            <div className={styles.about_item}>
              <p className={styles.title}>About you</p>
              <div className={styles.about}>
                <Form.Item name="about">
                  <Input.TextArea rows={5} />
                </Form.Item>
              </div>
            </div>

            <div id="uploader_fm" className={styles.uploader}>
              <p className={styles.title}>Cover photo</p>
              <div className={styles.avatar_container}>
                <AvaUploader avatarUrl={avatar} setAvatar={setAvatar} />
              </div>
            </div>
          </div>
          <div className={styles.tags_wrapper}>
            <p className={styles.sec1}>Tags (Up to 5 tags for your speciality and services)</p>
            <div className={styles.service_tags}>
              <Form.Item name="shopTags">
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
            </div>
          </div>

          <p className={styles.header}>Delivery policy</p>
          <div className={styles.delivery_layout}>
            <div className={styles.delivery_container}>
              <Checkbox id="standart" checked={standart} onChange={onChangeStandartChkBox}>
                Standart
              </Checkbox>
              <div className={styles.standart_data}>
                <div className={styles.standart_block}>
                  <div className={cls(styles.standart_cost, 'delivery-input_number')}>
                    <label className={styles.label}>Cost of delivery</label>
                    <Form.Item name="standartCost" normalize={(value) => Math.abs(Number(value))}>
                      <InputNumber
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        disabled={!standart}
                      />
                    </Form.Item>
                  </div>
                  <div className={cls(styles.standart_cost, 'delivery-input_number')}>
                    <label className={styles.label}>Free for order over</label>
                    <Form.Item
                      name="standartFreeEdge"
                      normalize={(value) => Math.abs(Number(value))}
                    >
                      <InputNumber
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        disabled={!standart}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.notes}>
                  <p className={styles.label_note}>Note</p>
                  <Form.Item name="standartNotes">
                    <Input.TextArea
                      placeholder="Standard delivery description"
                      rows={5}
                      disabled={!standart}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className={styles.delivery_container}>
              <Checkbox id="1" checked={freepick} onChange={onChangeFreePickChkBox}>
                Free Pick-up
              </Checkbox>
              <div className={styles.notes}>
                <p className={styles.label_note}>Note</p>
                <Form.Item name="freePickNote">
                  <Input.TextArea
                    placeholder="Pick up description."
                    rows={5}
                    disabled={!freepick}
                  />
                </Form.Item>
              </div>
            </div>
            <div className={styles.delivery_container}>
              <Checkbox id="0" checked={express} onChange={onChangeExpressChkBox}>
                Express
              </Checkbox>
              <div className={styles.standart_data}>
                <div className={styles.standart_block}>
                  <div className={cls(styles.standart_cost, 'delivery-input_number')}>
                    <label className={styles.label}>Cost of delivery</label>
                    <Form.Item name="expressCost" normalize={(value) => Math.abs(Number(value))}>
                      <InputNumber
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        disabled={!express}
                      />
                    </Form.Item>
                  </div>
                  <div className={cls(styles.standart_cost, 'delivery-input_number')}>
                    <label className={styles.label}>Free for order over</label>
                    <Form.Item
                      name="expressFreeEdge"
                      normalize={(value) => Math.abs(Number(value))}
                    >
                      <InputNumber
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        disabled={!express}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.notes}>
                  <p className={styles.label_note}>Note</p>
                  <Form.Item name="expressNotes">
                    <Input.TextArea
                      placeholder="Express delivery description."
                      rows={5}
                      disabled={!express}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className={styles.delivery_container}>
              <Checkbox id="3" checked={free} onChange={onChangeFreeChkBox}>
                Free Delivery
              </Checkbox>
              <div className={styles.standart_data}>
                <div className={styles.standart_block}>
                  <div className={cls(styles.standart_cost, 'delivery-input_number')}>
                    <p className={styles.label_note}>Minimum spend to recieve</p>
                    <Form.Item name="freeMinimum" normalize={(value) => Math.abs(Number(value))}>
                      <InputNumber
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        disabled={!free}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.apply_btn}>
            <Form.Item>
              <Button type="primary" block size="large" htmlType="submit">
                SAVE
              </Button>
            </Form.Item>
          </div>
          {success && <div className={styles.success}>Saved successfully</div>}
        </Form>
      </div>
    </div>
  )
}

ShopProfile.propTypes = {
  getUserAccount: T.func,
  updateFoodmakerAccountAC: T.func,
  getServiceTagsAC: T.func,
  getSpecialityTagsAC: T.func,
  getProductTagsRequestAC: T.func,
  account: T.shape(),
  serviceTags: T.arrayOf(T.shape()),
  specialityTags: T.arrayOf(T.shape()),
  productTags: T.arrayOf(T.shape()),
}

export default connect(
  ({ account, system: { serviceTags, specialityTags, productTags } }) => ({
    account,
    serviceTags,
    specialityTags,
    productTags,
  }),
  {
    getUserAccount,
    updateFoodmakerAccountAC,
    getServiceTagsAC,
    getSpecialityTagsAC,
    getProductTagsRequestAC,
  },
)(ShopProfile)
