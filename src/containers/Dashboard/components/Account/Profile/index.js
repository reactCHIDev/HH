import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import Button from 'components/Button'
import EditIcon from 'assets/icons/svg/editor-icon.svg'
import { connect } from 'react-redux'
import { getItem } from 'utils/localStorage'
import axios from 'axios'
import { getUserAccount, updatePhotoNameAC } from 'actions/account'
import { Upload, Progress } from 'antd'
import ImgCrop from 'antd-img-crop'
import styles from './profile.module.scss'
import './profile.less'

const Profile = ({ account, getUserAccount, updatePhotoNameAC }) => {
  const { success } = account

  const [defaultFileList, setFileList] = useState([])
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [progress, setProgress] = useState(0)
  const [avatar, setAvatar] = useState('')

  const onSubmit = () => {
    const payload = {}
    if (name !== account.profileName) payload.profileName = name
    if (defaultFileList.length) payload.userPhoto = defaultFileList[0].url
    updatePhotoNameAC(payload)
  }

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
    setName(account.profileName)
  }, [account])

  /*  useEffect(() => {
    if (account.userPhoto) setFileList({ url: account.userPhoto, uid: '-1' })
  }, [account]) */

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

  const onChangeInput = (e) => setName(e.target.value)

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

  const changePhoto = () => {
    setFileList([])
  }

  return (
    <div className={styles.info_container}>
      <div className={styles.data_container}>
        <p className={styles.head}>Profile</p>
        <p className={styles.subhead}>User info</p>
        <div id="uploader" className={styles.uploader}>
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
          <p className={styles.change_photo} onClick={changePhoto}>
            CHANGE USER’S PHOTO
          </p>
        </div>
        <div className={styles.name_section}>
          <div className={styles.content}>
            <p className={styles.label}>Name</p>
            <input
              className={styles.input_name}
              type="text"
              onChange={onChangeInput}
              value={name}
            />
          </div>
          <div className={styles.edit_icon}>
            <img src={EditIcon} alt="edit" />
          </div>
        </div>
        <div className={styles.btn_container}>
          <Button title="Apply" onClick={onSubmit} />
        </div>
      </div>
      <div className={styles.rewards}>
        <p className={styles.heading}>Rewards earned</p>
        <p className={styles.main}>
          <span className={styles.hundred}>{'100'}</span>Hunger Hugger points
        </p>
      </div>
    </div>
  )
}

Profile.propTypes = {
  profileName: T.string,
  getUserAccount: T.func,
  updatePhotoNameAC: T.func,
  account: T.shape(),
}

export default connect(({ account }) => ({ account }), { getUserAccount, updatePhotoNameAC })(
  Profile,
)
