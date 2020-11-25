import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { getUserAccount, updateFoodmakerAccountAC } from 'actions/account'
import { Upload, Progress } from 'antd'
import ImgCrop from 'antd-img-crop'
import Button from 'components/Button'
import { Input, Select, InputNumber, Checkbox } from 'antd'
import EditIcon from 'assets/icons/svg/editor-icon.svg'
import { connect } from 'react-redux'
import { getItem } from 'utils/localStorage'
import axios from 'axios'
import styles from './foodmakerprofile.module.scss'
import './foodmakerprofile.less'

const FoodmakerProfile = (props) => {
  const { account, getUserAccount, updateFoodmakerAccountAC } = props
  const { success } = account

  const [defaultFileList, setFileList] = useState([])
  const [url, setUrl] = useState('')
  const [progress, setProgress] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [selectedItems, setSelectedItems] = useState([])

  const tags = [
    { id: 1, tagName: 'Drink' },
    { id: 2, tagName: 'Salad' },
    { id: 3, tagName: 'Bread' },
    { id: 4, tagName: 'Soup' },
    { id: 5, tagName: 'Pasta' },
  ]

  const handleChangeTags = (selectedItms) => {
    console.log('%c     selectedItms ', 'color: darkgreen; background: palegreen;', selectedItms)
    setSelectedItems(selectedItms)
  }

  const filteredTags = tags.filter((o) => !selectedItems.includes(o.id))

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

  const onChange = ({ fileList: newFileList }) => {
    let list = []

    if (defaultFileList.length < newFileList.length) {
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
      list = defaultFileList.filter((e) => newFileList.find((f) => f.uid === e.uid))
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
      // Authorization:
      // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsQGJpZ2RpZy5jb20udWEiLCJwcm9maWxlTmFtZSI6IkFsZXhGTSIsInJvbGUiOiJGT09ETUFLRVIiLCJpYXQiOjE2MDUyNzU5Nzh9.QluuzPvYk3e4g_mMFD-mVvnWJknyl1OIxz3fAwuemzc',
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
      // addFileList(defaultFileList.slice(0, -1))
      // throw new Error(`ERROR`)
    }
  }

  const onChangeName = (e) => setFirstName(e.target.value)
  const onChangeLastName = (e) => setLastName(e.target.value)
  const onChangeUrl = (e) => setUrl(e.target.value)

  const onSubmit = () => {
    const payload = {}
    // if (name !== account.profileName) payload.profileName = name
    if (defaultFileList.length) payload.userPhoto = defaultFileList[0].url

    console.log('%c   SUBMIT   ', 'color: white; background: royalblue;', payload)
    // updateFoodmakerAccountAC(payload)
  }

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
                  customRequest={sendFile}
                  listType="picture-card"
                  fileList={defaultFileList}
                  onChange={onChange}
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

        <div className={styles.profile_name}>
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
          <div className={styles.about}>
            <label className={styles.label}>About you</label>
            <Input.TextArea rows={4} />
          </div>
          <div className={styles.service_tags}>
            <label className={styles.label}>
              Tags (Up to 5 tags for your speciality and services)
            </label>
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

        <div className={styles.profile_url}>
          <p className={styles.sec2}>Profile url</p>
          <div className={styles.profile_data}>
            <div className={styles.url_name}>
              <label className={styles.label}>Try to make the link to your profile memorable</label>
              <Input onChange={onChangeUrl} value={url} />
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
