/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { getUserAccount } from 'actions/account'
import { updateFoodmakerAccountAC } from 'actions/foodmaker'
import { getSpecialityTagsAC, getServiceTagsAC } from 'actions/system'
import { getUserByHHLink } from 'api/requests/Account'
import { Button, Select } from 'antd'

import QR from 'qrcode'
import AvaUploader from 'components/AvatarUploader'
import Uploader from 'components/Uploader'
import { useForm, Controller } from 'react-hook-form'
import _ from 'lodash/fp'
import GotoLink from 'assets/icons/svg/goto_link.svg'
import { connect } from 'react-redux'
import styles from './foodmakerprofile.module.scss'
import './foodmakerprofile.less'

const FoodmakerProfile = (props) => {
  const {
    account,
    specialityTags,
    serviceTags,
    getUserAccount,
    updateFoodmakerAccountAC,
    getSpecialityTagsAC,
    getServiceTagsAC,
  } = props

  const { id, success, requesting } = account

  const [avatar, setAvatar] = useState('')
  const [cover, setCover] = useState('')
  const [fileList, setFilelist] = useState(null)
  const [isActive, setActiveNext] = useState(true)

  const [tags, setTags] = useState([])
  const [languages, setLanguages] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedLangs, setSelectedLangs] = useState([])

  const [qrImgSource, setQrImgSource] = useState(null)

  const [hungryHuggerLink, setSiteValue] = useState('www.hungryhugger.com/')

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

  const handleChangeTags = (selectedItms) => {
    setSelectedItems(selectedItms.slice(0, 5))
  }
  const handleChangeLangs = (selectedLngs) => {
    setSelectedLangs(selectedLngs)
  }

  const normalizeTagsForSubmit = (value, allTags) =>
    value.map((t) => allTags.find((e) => e.tagName === t).id)

  const normalizeTagsForRender = (value, allTags) =>
    value.map((t) => allTags.find((e) => e.id === t).tagName)

  const filteredTags = tags.length ? tags.filter((o) => !selectedItems.includes(o.tagName)) : []
  const filteredLangs = languages.filter((o) => !selectedLangs.includes(o.tagName))

  const { Option } = Select

  const discnt = [
    { value: 'Mr', title: 'Mr' },
    { value: 'Ms', title: 'Ms' },
  ]

  useEffect(() => {
    if (id) getUserAccount(id)
    getSpecialityTagsAC()
    getServiceTagsAC()
  }, [getUserAccount, getSpecialityTagsAC, id])

  useEffect(() => {
    if (account.hungryHuggerLink) setSiteValue(account.hungryHuggerLink)
    setAvatar(account?.userPhoto || '')
    if (account?.coverPhoto) {
      setFilelist(
        [account?.coverPhoto].concat(account?.otherPhotos || []).map((e, i) => {
          const ext = e.split('.').pop()
          return {
            uid: e.slice(-28, -(ext.length + 1)),
            status: 'done',
            url: e,
            name: `image${i}.${ext}`,
          }
        }),
      )

      setCover(account.coverPhoto.slice(-28, -(account.coverPhoto.split('.').pop().length + 1)))
    }
    setSelectedItems(account?.tags || [])
    setSelectedLangs(account?.languages || [])
    if (account?.firstName) {
      const { profileName, reffering, firstName, lastName, about } = account
      setValue('profileName', profileName)
      setValue('reffering', reffering)
      setValue('firstName', firstName)
      setValue('lastName', lastName)
      setValue('about', about)
    }
    // eslint-disable-next-line
  }, [account])

  useEffect(() => {
    if (fileList?.length && !fileList.some((e) => e.uid === cover)) setCover(fileList[0].uid)
    // eslint-disable-next-line
  }, [fileList])

  useEffect(() => {
    if (specialityTags && specialityTags.length && serviceTags && serviceTags.length)
      setTags(specialityTags.concat(serviceTags))

    // eslint-disable-next-line
  }, [specialityTags, serviceTags])

  useEffect(() => {
    generateQR(hungryHuggerLink)
  }, [hungryHuggerLink])

  useEffect(() => {
    if (success) {
      if (id) getUserAccount(id)
    }
    // eslint-disable-next-line
  }, [success, getUserAccount])

  const fixedText = `${process.env.REACT_APP_BASE_URL}/`

  const onChangeHHLink = (e) => {
    const { value } = e.target
    const reg = /^(?=.{2,50}$)[a-zA-Z][a-zA-Z0-9]*(?: [a-zA-Z0-9]+)*$/

    if (!'pre'.concat(value.slice(fixedText.length)).match(reg)) return
    if (value.substring(0, fixedText.length) === fixedText) setSiteValue(value)
  }

  const onSubmit = (formValues) => {
    const userPhoto = avatar
    const coverItem = fileList.length ? fileList.find((e) => e.uid === cover) : { url: '' }
    const coverPhoto = coverItem?.response ? coverItem.response.url : coverItem.url
    const otherPhotos =
      fileList.length > 1
        ? fileList
            .filter((e) => e.uid !== cover)
            .filter((e) => e.status !== 'error')
            .map((e) => (e?.response ? e.response.url : e.url))
        : []
    // const otherPhotos = fileList.length > 1 ? fileList.filter((_, i) => i !== cover) : []
    const tags = selectedItems
    const languages = selectedLangs

    const payload = {
      ...formValues,
      tags,
      coverPhoto,
      otherPhotos,
      userPhoto,
      hungryHuggerLink,
      languages,
    }

    Object.keys(payload).forEach((f) => {
      if (!payload[f] || payload[f].length === 0) delete payload[f]
    })

    updateFoodmakerAccountAC(payload)
  }

  const onNext = (data) => {
    console.log('%c   formData   ', 'color: darkgreen; background: palegreen;', data)
  }

  return (
    <div className={styles.container}>
      {account.firstName && (
        <div className={styles.content}>
          <div className={styles.avatar_container}>
            <AvaUploader avatarUrl={avatar} setAvatar={setAvatar} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div id="form" className={styles.data_section}>
              <div className={styles.profile_section}>
                <p className={styles.sec1}>Your profile *</p>

                <div className={styles.user_data}>
                  <div className={styles.profile_name}>
                    <label className={styles.label}>Username</label>
                    <input
                      className={styles.input}
                      name="profileName"
                      type="text"
                      autoComplete="off"
                      onChange={null}
                      ref={register({
                        required: true,
                        validate: async (value) => {
                          const name = value
                            .split(' ')
                            .reduce((acc, el) => (el ? `${acc}${el}` : acc))
                            .trim()
                          const url = `${process.env.REACT_APP_BASE_URL}/${name.toLowerCase()}`
                          if (url === hungryHuggerLink) return true
                          const user = await getUserByHHLink(url)
                          return !user.data?.profileName
                        },
                        maxLength: {
                          value: 100,
                        },
                      })}
                    />
                    {errors?.profileName?.type === 'validate' && (
                      <p className={styles.errmsg}>This user already exists</p>
                    )}
                  </div>
                </div>

                <div className={styles.user_data}>
                  <div className={styles.refer}>
                    <label className={styles.label}>Mr/Ms</label>

                    <Controller
                      control={control}
                      name="reffering"
                      rules={{ required: false }}
                      render={({ onChange, value, name }) => (
                        <div>
                          <Select onChange={onChange} name={name} value={value}>
                            {discnt.map((n) => (
                              <Option key={n.value} value={n.value}>
                                {n.title}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      )}
                    />
                  </div>

                  <div className={styles.first_name}>
                    <label className={styles.label}>First name</label>
                    <input
                      className={styles.input}
                      name="firstName"
                      type="text"
                      autoComplete="off"
                      ref={register({
                        required: true,
                        maxLength: {
                          value: 66,
                        },
                      })}
                    />
                    {_.get('firstName.type', errors) === 'required' && (
                      <p className={styles.errmsg}>This field is required</p>
                    )}
                    {_.get('firstName.type', errors) === 'maxLength' && (
                      <p className={styles.errmsg}>Max length 66 symbols</p>
                    )}
                  </div>

                  <div className={styles.last_name}>
                    <label className={styles.label}>Last name</label>
                    <input
                      className={styles.input}
                      name="lastName"
                      type="text"
                      autoComplete="off"
                      ref={register({
                        required: true,
                        maxLength: {
                          value: 66,
                        },
                      })}
                    />
                    {_.get('lastName.type', errors) === 'required' && (
                      <p className={styles.errmsg}>This field is required</p>
                    )}
                    {_.get('lastName.type', errors) === 'maxLength' && (
                      <p className={styles.errmsg}>Max length 66 symbols</p>
                    )}
                  </div>
                </div>

                <div className={styles.about}>
                  <p className={styles.sec1}>About you</p>
                  <textarea
                    className={styles.textarea}
                    name="about"
                    rows="7"
                    ref={register({
                      required: false,
                    })}
                  />
                </div>

                <p className={styles.sec1}>Tags (Up to 5 tags for your speciality and services)</p>
                <div className={styles.service_tags}>
                  <Select
                    name="tags"
                    mode="multiple"
                    value={selectedItems}
                    onChange={handleChangeTags}
                    showArrow
                    style={{ width: '100%' }}
                  >
                    {filteredTags.map((item) => (
                      <Select.Option key={item.tagName + item.id} value={item.tagName}>
                        {item.tagName}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className={styles.gallery_section}>
                <p className={styles.sec2}>Profile url</p>
                <div className={styles.profile_url}>
                  <div className={styles.profile_data}>
                    <div className={styles.url_name}>
                      <a href={hungryHuggerLink} className={styles.url_btn}>
                        <img src={GotoLink} alt="link" />
                      </a>
                      <label className={styles.label}>
                        Your username is use for your profile url
                      </label>
                      <input
                        className={styles.input}
                        name="hungryHuggerLink"
                        type="text"
                        autoComplete="off"
                        onChange={onChangeHHLink}
                        value={hungryHuggerLink}
                        ref={register({
                          required: true,
                          validate: async (value) => {
                            if (value === account.hungryHuggerLink) return true
                            const user = await getUserByHHLink(value)
                            return !user.data?.profileName
                          },
                          maxLength: {
                            value: 100,
                          },
                        })}
                      />
                      {errors?.hungryHuggerLink?.type === 'validate' && (
                        <p className={styles.errmsg}>A user with these parameters already exists</p>
                      )}
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
                <div className={styles.gallery_container}>
                  <p className={styles.sec1}>Gallery</p>
                  {cover && (
                    <Uploader
                      list={fileList}
                      listSet={setFilelist}
                      cover={cover}
                      setCover={setCover}
                      min={2}
                      setActiveNext={setActiveNext}
                    />
                  )}
                </div>

                <p className={styles.sec1}>Languages you speak</p>

                <div className={styles.lang_tags}>
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
              </div>
            </div>
            {success && <div className={styles.success}>Saved successful</div>}
            <div className={styles.submit_wrapper}>
              <Button
                type="primary"
                loading={requesting || success}
                block
                size="large"
                disabled={!isActive}
                htmlType="submit"
              >
                SAVE
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

FoodmakerProfile.propTypes = {
  getUserAccount: T.func,
  updateFoodmakerAccountAC: T.func,
  getSpecialityTagsAC: T.func,
  getServiceTagsAC: T.func,
  account: T.shape(),
  specialityTags: T.arrayOf(T.shape()),
  serviceTags: T.arrayOf(T.shape()),
}

export default connect(
  ({ account, system: { specialityTags, serviceTags } }) => ({
    account,
    specialityTags,
    serviceTags,
  }),
  {
    getUserAccount,
    updateFoodmakerAccountAC,
    getSpecialityTagsAC,
    getServiceTagsAC,
  },
)(FoodmakerProfile)
