import React, { useState, useEffect } from 'react'
import T, { nominalTypeHack } from 'prop-types'
import { Upload, Modal, Progress } from 'antd'
import axios from 'axios'
import { PlusOutlined } from '@ant-design/icons'
import Heading from '../../components/heading'
import styles from './photo.module.scss'
import './photo.less'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const Photo = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props

  const [coverPhoto, setCoverPhoto] = useState(value.coverPhoto)
  const [otherPhotos, setOtherPhotos] = useState(value.otherPhotos)

  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [defaultFileList, addFileList] = useState([])
  const [url, setUrl] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setCoverPhoto(value.coverPhoto)
    setOtherPhotos(value.otherPhotos)
  }, [])

  useEffect(() => {
    console.log('%c   useEffect  url ', 'color: darkgreen; background: palegreen;', url)
    if (defaultFileList.length) {
      const list = [...defaultFileList]
      list[list.length - 1].url = url
      addFileList(list)
    }
  }, [url])

  const handleChangeCover = (path) => {
    setCoverPhoto(path)
  }
  const handleChangeAdd = (path) => {
    setOtherPhotos(otherPhotos.concat([path]))
  }

  const handleCancel = () => setPreviewVisible(false)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }

  const handleChange = ({ fileList }) => {
    let list = []

    if (defaultFileList.length < fileList.length) {
      list = fileList.map((e, i) =>
        i === fileList.length - 1
          ? {
              uid: e.uid,
              name: e.name,
              status: 'done',
            }
          : e,
      )
    } else {
      list = defaultFileList.filter((e) => fileList.find((f) => f.uid === e.uid))
    }
    addFileList(list)
  }

  const submit = () => {
    const submitData = {
      otherPhotos: {
        coverPhoto: defaultFileList.length > 0 ? defaultFileList[0].url : '',
        otherPhotos: defaultFileList.length > 1 ? defaultFileList.slice(1).map((e) => e.url) : [],
      },
    }
    onSubmit(submitData)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

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

  return (
    <div className={styles.container}>
      <Heading category="About" name="2 - 8 photos of your work" />
      <div className="photo_container">
        <Upload
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          // action="https://hungryhugger.wildwebart.com/api/v1/file/upload/photo"
          customRequest={sendFile}
          listType="picture-card"
          fileList={defaultFileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {defaultFileList.length >= 8 || progress > 0 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        {progress > 0 ? <Progress percent={progress} /> : <div style={{ height: 20 }} />}
      </div>
      <p className={styles.description}>
        Show your work at its best! This directly affects the number of orders.
      </p>
      <input
        className={styles.next}
        disabled={defaultFileList.length < 2}
        onClick={submit}
        type="button"
        value="Next  >"
      />
    </div>
  )
}

Photo.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.shape(),
  }),
  onSubmit: T.func,
}

export default Photo
