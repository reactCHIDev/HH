import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import axios from 'axios'
import { Button, Upload, Modal, Progress } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getItem, setItem } from 'utils/localStorage'
import styles from './step3.module.scss'
import './step3.less'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const Step3 = (props) => {
  const { setStep } = props

  const prevState = getItem('addProduct')

  const [coverPhoto, setCoverPhoto] = useState(prevState?.coverPhoto || '')
  const [otherPhotos, setOtherPhotos] = useState(prevState?.otherPhotos)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [defaultFileList, addFileList] = useState([])
  const [url, setUrl] = useState('')
  const [progress, setProgress] = useState(0)

  console.log('%c   coverPhoto   ', 'color: darkgreen; background: palegreen;', coverPhoto)
  console.log('%c   otherPhotos   ', 'color: darkgreen; background: palegreen;', otherPhotos)

  useEffect(() => {
    if (defaultFileList.length) {
      const list = [...defaultFileList]
      list[list.length - 1].url = url
      addFileList(list)
    }
  }, [url])

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

  const onNext = (data) => {
    const prevSteps = getItem('addProduct')

    const formData = {}

    formData.coverPhoto = defaultFileList.length ? defaultFileList[0].url : ''
    formData.otherPhotos =
      defaultFileList.length > 1 ? defaultFileList.slice(1).map((f) => f.url) : []

    setItem('addProduct', {
      ...prevSteps,
      ...formData,
    })
    setStep(3)
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
      <div className={cls(styles.content, 'main')}>
        <p className={styles.header}>Add cover & photos</p>
        <div className="photo_container">
          <Upload
            customRequest={sendFile}
            listType="picture-card"
            fileList={defaultFileList}
            onPreview={handlePreview}
            onChange={handleChange}
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
        <Button
          type="primary"
          block
          disabled={defaultFileList.length < 3}
          size="large"
          onClick={onNext}
        >
          NEXT
        </Button>
      </div>
    </div>
  )
}

Step3.propTypes = {
  setStep: T.func.isRequired,
}

export default Step3
