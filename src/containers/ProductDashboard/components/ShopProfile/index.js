import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { getUserAccount } from 'actions/account'
import { updateShopAC } from 'actions/shop'
import { useForm, Controller } from 'react-hook-form'
import { Spin, Space } from 'antd'

import { getServiceTagsAC, getSpecialityTagsAC, getProductTagsRequestAC } from 'actions/system'
import cls from 'classnames'
import { getUserByHHLink } from 'api/requests/Account'
import { getShopByUrlReq } from 'api/requests/Shop'
import GotoLink from 'assets/icons/svg/goto_link.svg'

import QR from 'qrcode'
import AvaUploader from 'components/AvatarUploader'
import { Input, Select, Button, Form, Checkbox, InputNumber } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import styles from './shopprofile.module.scss'
import './shopprofile.less'
import { setItem } from 'utils/localStorage'

const ShopProfile = (props) => {
  const {
    id,
    shop,
    success,
    requesting,
    serviceTags,
    specialityTags,
    productTags,
    getUserAccount,
    getServiceTagsAC,
    getSpecialityTagsAC,
    getProductTagsRequestAC,
    updateShopAC,
  } = props

  const [defaults, setDefaults] = useState({})
  const [shopUrl, setShopUrl] = useState('')
  const [avatar, setAvatar] = useState('')
  const [tags, setTags] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [qrImgSource, setQrImgSource] = useState(null)

  const [standart, setStandart] = useState(false)
  const [freepick, setFreepick] = useState(false)
  const [express, setExpress] = useState(false)
  const [free, setFree] = useState(false)

  const onChangeStandartChkBox = (e) => setStandart(e.target.checked)
  const onChangeFreePickChkBox = (e) => setFreepick(e.target.checked)
  const onChangeExpressChkBox = (e) => setExpress(e.target.checked)
  const onChangeFreeChkBox = (e) => setFree(e.target.checked)

  const { register, handleSubmit, control, setValue, errors } = useForm({
    mode: 'onBlur',
  })

  const generateQR = async (text) => {
    try {
      const qr = await QR.toDataURL(text)
      setQrImgSource(qr)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (shop) {
      const { title, shopUrl, description, coverPhoto, tags, deliveryMethods } = shop

      setAvatar(coverPhoto)
      setShopUrl(shopUrl)
      setSelectedItems(tags)
      const delivery = deliveryMethods.reduce((acc, dm) => {
        Object.keys(dm).map((e) => {
          if (e !== 'type') {
            acc[dm.type + e] = dm[e]
          } else {
            if (dm[e] === 'standart') setStandart(true)
            if (dm[e] === 'freepick') setFreepick(true)
            if (dm[e] === 'express') setExpress(true)
            if (dm[e] === 'free') setFree(true)
          }
        })
        return acc
      }, {})

      setDefaults({
        title,
        description,
        tags,
        ...delivery,
      })
    }
  }, [shop])

  useEffect(() => {
    Object.keys(defaults).forEach((e) => setValue(e, defaults[e]))
  }, [defaults])

  const filteredTags = tags.length ? tags.filter((o) => !selectedItems.includes(o.tagName)) : []

  useEffect(() => {
    // if (id) getUserAccount(id)
    getServiceTagsAC()
    getSpecialityTagsAC()
    getProductTagsRequestAC()
  }, [])

  useEffect(() => {
    if (serviceTags?.length && specialityTags?.length && productTags?.length) {
      setTags([...specialityTags, ...productTags])
    }
  }, [serviceTags, specialityTags, productTags])

  useEffect(() => {
    generateQR(shopUrl)
  }, [shopUrl])

  useEffect(() => {
    if (success) {
      if (id) getUserAccount(id)
    }
  }, [success])

  const onSubmit = (formValues) => {
    const coverPhoto = avatar

    const values = { ...formValues }

    const standartDelivery = {
      type: 'standard',
      price: values.standartprice,
      freeDeliveryOver: values.standartfreeDeliveryOver,
      note: values.standartnote,
    }
    delete values.standartprice
    delete values.standartfreeDeliveryOver
    delete values.standartnote

    const freepickDelivery = {
      type: 'freepick',
      note: values.freepicknote,
    }
    delete values.freepicknote

    const expressDelivery = {
      type: 'express',
      price: values.expressprice,
      freeDeliveryOver: values.expressfreeDeliveryOver,
      note: values.expressnote,
    }
    delete values.expressprice
    delete values.expressfreeDeliveryOver
    delete values.expressnote

    const freeDelivery = {
      type: 'free',
      price: values.freeprice,
    }
    delete values.freeprice

    const delivery = []

    if (standart) delivery.push(standartDelivery)
    if (freepick) delivery.push(freepickDelivery)
    if (express) delivery.push(expressDelivery)
    if (free) delivery.push(freeDelivery)

    const payload = {
      ...values,
      id,
      coverPhoto,
      // hungryHuggerLink,
      deliveryMethods: delivery,
    }

    Object.keys(payload).forEach((f) => {
      if (!payload[f] || payload[f].length === 0) delete payload[f]
    })
    updateShopAC(payload)
  }

  const handleTags = (onChange) => (e) => {
    setSelectedItems(e)
    onChange(e)
  }

  const handleNumber = (onChange) => (e) => {
    onChange(Math.abs(e))
  }

  if (!defaults.title) return <></>
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.name_section}>
            <div className={styles.name_item}>
              <p className={styles.title}>Shop name</p>

              <div className={styles.first_name}>
                <label className={styles.label}>The shop name will be visible to everyone</label>
                <input
                  className={styles.input}
                  name="title"
                  type="text"
                  autoComplete="off"
                  onChange={null}
                  ref={register({
                    required: true,
                    validate: async (value) => {
                      const url = process.env.REACT_APP_BASE_URL + '/shop/' + value.toLowerCase()
                      if (url === shop?.shopUrl) return true
                      const shopData = await getShopByUrlReq(url)
                      return !shopData.data?.title
                    },
                    maxLength: {
                      value: 100,
                    },
                  })}
                />
                {errors?.title?.type === 'validate' && (
                  <p className={styles.errmsg}>This shop already exists</p>
                )}
              </div>
            </div>

            <div className={styles.url_item}>
              <p className={styles.title}>Shop url</p>
              <div className={styles.profile_url}>
                <div className={styles.profile_data}>
                  <div className={styles.url_name}>
                    <label className={styles.label}>Generated automatically</label>
                    <Input
                      value={shopUrl}
                      suffix={
                        <>
                          <a href={shopUrl} className={styles.url_btn}>
                            <img src={GotoLink} alt="link" />
                          </a>
                          <LockOutlined />
                        </>
                      }
                    />
                  </div>

                  {shopUrl && (
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
                <textarea
                  className={styles.textarea}
                  name="description"
                  rows="5"
                  ref={register({
                    required: false,
                  })}
                />
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
              <Controller
                control={control}
                name="tags"
                rules={{ required: false }}
                render={({ onChange, value, name }) => (
                  <Select
                    mode="multiple"
                    name={name}
                    onChange={handleTags(onChange)}
                    value={selectedItems}
                    showArrow
                    style={{ width: '100%' }}
                    tokenSeparators={[',']}
                  >
                    {filteredTags.map((item) => (
                      <Select.Option key={item.id} value={item.tagName}>
                        {item.tagName}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
          </div>

          <p className={styles.header}>Delivery policy</p>
          <div className={styles.delivery_layout}>
            <div className={styles.delivery_container}>
              <Checkbox id="standart" checked={standart} onChange={onChangeStandartChkBox}>
                Standard
              </Checkbox>
              <div className={styles.standart_data}>
                <div className={styles.standart_block}>
                  <div className={cls(styles.standart_cost, 'delivery-input_number')}>
                    <label className={styles.label}>Cost of delivery</label>
                    <Controller
                      control={control}
                      name="standartprice"
                      rules={{ required: false }}
                      render={({ onChange, value, name }) => (
                        <InputNumber
                          name={name}
                          value={value}
                          onChange={handleNumber(onChange)}
                          formatter={(value) =>
                            `HKD ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          parser={(value) => value.replace(/\HKD\s?|(,*)/g, '')}
                        />
                      )}
                    />
                  </div>
                  <div className={cls(styles.standart_cost, 'delivery-input_number')}>
                    <label className={styles.label}>Free for order over</label>

                    <Controller
                      control={control}
                      name="standartfreeDeliveryOver"
                      rules={{ required: false }}
                      render={({ onChange, value, name }) => (
                        <InputNumber
                          name={name}
                          value={value}
                          onChange={handleNumber(onChange)}
                          formatter={(value) =>
                            `HKD ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          parser={(value) => value.replace(/\HKD\s?|(,*)/g, '')}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={styles.notes}>
                  <p className={styles.label_note}>Note</p>

                  <textarea
                    className={styles.textarea}
                    name="standartnote"
                    placeholder="Standard delivery description"
                    rows="5"
                    ref={register({
                      required: false,
                    })}
                  />
                </div>
              </div>
            </div>
            <div className={styles.delivery_container}>
              <Checkbox id="1" checked={freepick} onChange={onChangeFreePickChkBox}>
                Free Pick-up
              </Checkbox>
              <div className={styles.notes}>
                <p className={styles.label_note}>Note</p>
                <textarea
                  className={styles.textarea}
                  name="freepicknote"
                  placeholder="Pick up description."
                  rows="5"
                  ref={register({
                    required: false,
                  })}
                />
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

                    <Controller
                      control={control}
                      name="expressprice"
                      rules={{ required: false }}
                      render={({ onChange, value, name }) => (
                        <InputNumber
                          name={name}
                          value={value}
                          onChange={handleNumber(onChange)}
                          formatter={(value) =>
                            `HKD ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          parser={(value) => value.replace(/\HKD\s?|(,*)/g, '')}
                        />
                      )}
                    />
                  </div>
                  <div className={cls(styles.standart_cost, 'delivery-input_number')}>
                    <label className={styles.label}>Free for order over</label>

                    <Controller
                      control={control}
                      name="expressfreeDeliveryOver"
                      rules={{ required: false }}
                      render={({ onChange, value, name }) => (
                        <InputNumber
                          name={name}
                          value={value}
                          onChange={handleNumber(onChange)}
                          formatter={(value) =>
                            `HKD ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          parser={(value) => value.replace(/\HKD\s?|(,*)/g, '')}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={styles.notes}>
                  <p className={styles.label_note}>Note</p>

                  <textarea
                    className={styles.textarea}
                    name="expressnote"
                    placeholder="Express delivery description."
                    rows="5"
                    ref={register({
                      required: false,
                    })}
                  />
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

                    <Controller
                      control={control}
                      name="freeprice"
                      rules={{ required: false }}
                      render={({ onChange, value, name }) => (
                        <InputNumber
                          name={name}
                          value={value}
                          onChange={handleNumber(onChange)}
                          formatter={(value) =>
                            `HKD ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          parser={(value) => value.replace(/\HKD\s?|(,*)/g, '')}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.apply_btn}>
            {success && <div className={styles.success}>Saved successfully</div>}
            <Form.Item>
              <Button type="primary" block size="large" loading={requesting} htmlType="submit">
                SAVE
              </Button>
            </Form.Item>
          </div>
        </form>
        {/* </Form> */}
      </div>
    </div>
  )
}

ShopProfile.propTypes = {
  getUserAccount: T.func,
  updateShopAC: T.func,
  getServiceTagsAC: T.func,
  getSpecialityTagsAC: T.func,
  getProductTagsRequestAC: T.func,
  id: T.number,
  shop: T.shape(),
  success: T.bool,
  requesting: T.bool,
  serviceTags: T.arrayOf(T.shape()),
  specialityTags: T.arrayOf(T.shape()),
  productTags: T.arrayOf(T.shape()),
}

export default connect(
  ({
    account: { shop },
    shop: { success, requesting },
    system: { serviceTags, specialityTags, productTags },
  }) => ({
    id: shop?.id,
    success,
    requesting,
    shop,
    serviceTags,
    specialityTags,
    productTags,
  }),
  {
    getUserAccount,
    updateShopAC,
    getServiceTagsAC,
    getSpecialityTagsAC,
    getProductTagsRequestAC,
  },
)(ShopProfile)
