import React, { useState, useEffect } from 'react'
import T from 'prop-types'

import { getUserAccount, updateAccount } from 'actions/account'
import { updateFoodmakerAccountAC } from 'actions/foodmaker'
import { getServiceTagsAC, getSpecialityTagsAC, getProductTagsRequestAC } from 'actions/system'
import cls from 'classnames'
import QR from 'qrcode'

import ImgCrop from 'antd-img-crop'
import Btn from 'components/Button'
import { Input, Select, Button, Form, Upload, Modal, Checkbox, InputNumber, Progress } from 'antd'
import { PlusOutlined, LockOutlined } from '@ant-design/icons'

import { connect } from 'react-redux'
import axios from 'axios'

import styles from './shopprofile.module.scss'
import './shopprofile.less'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

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

  const [defaultFileList, setFileList] = useState([])
  const [url, setUrl] = useState('')

  const [progress, setProgress] = useState(0)

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

  useEffect(() => {
    if (defaultFileList.length) {
      const list = [...defaultFileList]
      list[list.length - 1].url = url
      setFileList(list)
    }
  }, [url])

  const onChange = ({ fileList: newFileList }) => {
    let list = []
    const targetList = defaultFileList

    if (targetList.length < newFileList.length) {
      list = newFileList.map((e, i) =>
        i === newFileList.length - 1
          ? {
              uid: e.uid,
              name: e.name,
              status: 'done',
            }
          : e,
      )
    } else {
      list = targetList.filter((e) => newFileList.find((f) => f.uid === e.uid))
    }
    setFileList(list)
  }

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }

  async function sendFile(options) {
    const { onSuccess, onError, file, onProgress } = options
    const formData = new FormData()
    formData.append('file', file)
    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
      'x-api-key': '11edff01b8c5e3cfa0027fd313365f264b',
    }
    try {
      const res = await axios.post(
        'https://hungryhugger.wildwebart.com/api/v1/file/upload/photo',
        formData,
        {
          headers,
          onUploadProgress: (event) => {
            const percent = Math.floor((event.loaded / event.total) * 100)
            setProgress(percent)
            if (percent === 100) {
              setTimeout(() => setProgress(0), 3000)
            }
            onProgress({ percent: (event.loaded / event.total) * 100 })
          },
        },
      )
      setUrl(res.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const onSubmit = (formValues) => {
    const userPhoto = defaultFileList.length ? defaultFileList[0].url : ''

    const values = { ...formValues }

    if (!standart) {
      delete values.standartCost
      delete values.standartFreeEdge
    }
    if (!freepick) {
      delete values.freePickNote
    }
    if (!express) {
      delete values.expressCost
      delete values.expressFreeEdge
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const { reffering, firstName, lastName, about } = account

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Form
          layout="vertical"
          name="fmProfile"
          onFinish={onSubmit}
          initialValues={{ reffering, firstName: firstName, lastName, about }}
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
                  <Input.TextArea rows={4} />
                </Form.Item>
              </div>
            </div>

            <div id="uploader_fm" className={styles.uploader}>
              <p className={styles.title}>Cover photo</p>
              <div className={styles.uploader_wrapper}>
                {defaultFileList && (
                  <div className={styles.photo_uploader}>
                    <ImgCrop rotate>
                      <Upload
                        customRequest={(options) => sendFile(options, true)}
                        listType="picture-card"
                        fileList={defaultFileList}
                        onChange={(options) => onChange(options, true)}
                        onPreview={onPreview}
                      >
                        {defaultFileList.length < 1 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                    <div className={styles.progress_container}>
                      {progress > 0 ? <Progress percent={progress} /> : null}
                    </div>
                  </div>
                )}
                <div className={styles.photo_btn}>
                  <div className={styles.btn_container}>
                    <Btn title="UPLOAD PHOTO" onClick={onSubmit} />
                  </div>
                </div>
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
              <div className={styles.standart_block}>
                <div className={cls(styles.standart_cost, 'input_number')}>
                  <label className={styles.label}>Cost of delivery</label>
                  <Form.Item name="standartCost">
                    <InputNumber
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      disabled={!standart}
                    />
                  </Form.Item>
                </div>
                <div className={cls(styles.standart_cost, 'input_number')}>
                  <label className={styles.label}>Free for order over</label>
                  <Form.Item name="standartFreeEdge">
                    <InputNumber
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
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
              <div style={{ padding: '5px 0 0 24px' }}>
                <label className={styles.label}>Note</label>
                <Form.Item name="freePickNote">
                  <Input disabled={!freepick} />
                </Form.Item>
              </div>
            </div>
            <div className={styles.delivery_container}>
              <Checkbox id="0" checked={express} onChange={onChangeExpressChkBox}>
                Express
              </Checkbox>
              <div className={styles.standart_block}>
                <div className={cls(styles.standart_cost, 'input_number')}>
                  <label className={styles.label}>Cost of delivery</label>
                  <Form.Item name="expressCost">
                    <InputNumber
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      disabled={!express}
                    />
                  </Form.Item>
                </div>
                <div className={cls(styles.standart_cost, 'input_number')}>
                  <label className={styles.label}>Free for order over</label>
                  <Form.Item name="expressFreeEdge">
                    <InputNumber
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
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
              <div className={styles.standart_block}>
                <div className={cls(styles.standart_cost, 'input_number')}>
                  <label className={styles.label}>Minimum spend to recieve</label>
                  <Form.Item name="freeMinimum">
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
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit">
              SAVE
            </Button>
          </Form.Item>
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
