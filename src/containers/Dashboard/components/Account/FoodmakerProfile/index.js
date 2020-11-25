import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { getUserAccount, updateFoodmakerAccountAC } from 'actions/account'
import { Upload, Modal, Progress } from 'antd'
import QR from 'qrcode'

import ImgCrop from 'antd-img-crop'
import Button from 'components/Button'
import { Input, Select, InputNumber, Checkbox } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import EditIcon from 'assets/icons/svg/editor-icon.svg'
import { connect } from 'react-redux'
import { getItem } from 'utils/localStorage'
import axios from 'axios'
import styles from './foodmakerprofile.module.scss'
import './foodmakerprofile.less'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const FoodmakerProfile = (props) => {
  const { account, getUserAccount, updateFoodmakerAccountAC } = props
  const { success } = account

  const [defaultFileList, setFileList] = useState([])
  const [url, setUrl] = useState('')
  const [galleryFileList, setGalleryFileList] = useState([])
  const [galleryUrl, setGalleryUrl] = useState('')

  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const [progress, setProgress] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedLangs, setSelectedLangs] = useState([])

  const [hhUrl, setHHUrl] = useState('test')
  const [qrImgSource, setQrImgSource] = useState(null)

  const generateQR = async (text) => {
    try {
      const qr = await QR.toDataURL(text)
      setQrImgSource(qr)
    } catch (err) {
      console.error(err)
    }
  }

  const tags = [
    { id: 1, tagName: 'Drink' },
    { id: 2, tagName: 'Salad' },
    { id: 3, tagName: 'Bread' },
    { id: 4, tagName: 'Soup' },
    { id: 5, tagName: 'Pasta' },
  ]

  const langs = [
    { id: 1, tagName: 'Japanese' },
    { id: 2, tagName: 'English' },
    { id: 3, tagName: 'French' },
    { id: 4, tagName: 'Spanish' },
    { id: 5, tagName: 'Chinese' },
  ]

  const handleChangeTags = (selectedItms) => {
    setSelectedItems(selectedItms)
  }
  const handleChangeLangs = (selectedLngs) => {
    setSelectedLangs(selectedLngs)
  }

  const filteredTags = tags.filter((o) => !selectedItems.includes(o.tagName))
  const filteredLangs = langs.filter((o) => !selectedLangs.includes(o.tagName))

  const { Option } = Select

  const discnt = [
    { value: 'Ms', title: 'Ms' },
    { value: 'Mss', title: 'Mss' },
    { value: 'Mr', title: 'Mr' },
  ]

  useEffect(() => {
    const id = getItem('user-id')
    if (id) getUserAccount(id)
  }, [])

  useEffect(() => {
    generateQR(hhUrl)
  }, [hhUrl])

  useEffect(() => {
    if (success) {
      const id = getItem('user-id')
      if (id) getUserAccount(id)
    }
  }, [success])

  useEffect(() => {
    if (defaultFileList.length) {
      const list = [...defaultFileList]
      list[list.length - 1].url = url
      setFileList(list)
    }
  }, [url])

  useEffect(() => {
    if (galleryFileList.length) {
      const list = [...galleryFileList]
      list[list.length - 1].url = galleryUrl
      setGalleryFileList(list)
    }
  }, [galleryUrl])

  const handleCancel = () => setPreviewVisible(false)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }

  const onChange = ({ fileList: newFileList }, avatar) => {
    let list = []
    const targetList = avatar ? defaultFileList : galleryFileList

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
    avatar ? setFileList(list) : setGalleryFileList(list)
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

  async function sendFile(options, avatar) {
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
      avatar ? setUrl(res.data) : setGalleryUrl(res.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const onChangeName = (e) => setFirstName(e.target.value)
  const onChangeLastName = (e) => setLastName(e.target.value)
  const onChangeUrl = (e) => {} // setUrl(e.target.value)

  const onSubmit = () => {
    const payload = {}
    // if (name !== account.profileName) payload.profileName = name
    if (defaultFileList.length) payload.userPhoto = defaultFileList[0].url

    console.log('%c   SUBMIT   ', 'color: white; background: royalblue;', payload)
    // updateFoodmakerAccountAC(payload)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.head}>Foodmaker Profile</p>

        <div id="uploader_fm" className={styles.uploader}>
          {success && <div className={styles.success}>Saved successfully</div>}
          {defaultFileList && (
            <div className={styles.photo_uploader}>
              <ImgCrop rotate>
                <Upload
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
            <p>Avatar</p>
            <div className={styles.btn_container}>
              <Button title="UPLOAD PHOTO" onClick={onSubmit} />
            </div>
          </div>
        </div>

        <div className={styles.data_section}>
          <div className={styles.profile_section}>
            <p className={styles.sec1}>Profile name</p>

            <div className={styles.user_data}>
              <div className={styles.refer}>
                <label className={styles.label}>Ms/Mss/Mr</label>
                <Select onChange={() => {}}>
                  {discnt.map((n) => (
                    <Option key={n.value} value={n.value}>
                      {n.title}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className={styles.first_name}>
                <label className={styles.label}>First name</label>
                <Input onChange={onChangeName} value={firstName} />
              </div>
              <div className={styles.last_name}>
                <label className={styles.label}>Last name</label>
                <Input onChange={onChangeLastName} value={lastName} />
              </div>
            </div>
            <p className={styles.sec1}>About you</p>

            <div className={styles.about}>
              <Input.TextArea rows={4} />
            </div>
            <p className={styles.sec1}>Tags (Up to 5 tags for your speciality and services)</p>

            <div className={styles.service_tags}>
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
            </div>
          </div>

          <div className={styles.gallery_section}>
            <p className={styles.sec2}>Profile url</p>
            <div className={styles.profile_url}>
              <div className={styles.profile_data}>
                <div className={styles.url_name}>
                  <label className={styles.label}>
                    Try to make the link to your profile memorable
                  </label>
                  <Input onChange={onChangeUrl} value={url} />
                </div>

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
              </div>
            </div>

            <div className={styles.gallery_container}>
              <p className={styles.sec1}>Gallery</p>

              <div className="photo_container">
                <Upload
                  customRequest={sendFile}
                  listType="picture-card"
                  fileList={galleryFileList}
                  onPreview={handlePreview}
                  onChange={onChange}
                >
                  {defaultFileList.length >= 8 || progress > 0 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                {progress > 0 ? <Progress percent={progress} /> : <div style={{ height: 20 }} />}
              </div>
            </div>
            <p className={styles.sec1}>Languages you speak</p>

            <div className={styles.lang_tags}>
              <Select
                mode="multiple"
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
      </div>
    </div>
  )
}

FoodmakerProfile.propTypes = {
  profileName: T.string,
  getUserAccount: T.func,
  updateFoodmakerAccountAC: T.func,
  account: T.shape(),
}

export default connect(({ account }) => ({ account }), {
  getUserAccount,
  updateFoodmakerAccountAC,
})(FoodmakerProfile)
