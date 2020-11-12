import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Button } from 'antd'
import cls from 'classnames'
import { Upload, Modal } from 'antd'
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
  const [otherPhotos, setOtherPhotos] = useState([])

  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, addFileList] = useState([])

  const handleCancel = () => setPreviewVisible(false)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }

  const handleChange = ({ fileList }) => addFileList(fileList)

  const onNext = (data) => {
    const prevSteps = getItem('addProduct')
    setItem('addProduct', {
      ...prevSteps,
      coverPhoto: fileList[0].response.url,
      otherPhotos: fileList.slice(1).map((f) => f.response.url),
    })
    setStep()
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const onFinish = (values) =>
    console.log('%c   values   ', 'color: white; background: royalblue;', values)

  return (
    <div className={styles.container}>
      <div className={cls(styles.content, 'main')}>
        <p className={styles.header}>Add cover & photos</p>
        <div className="photo_container">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 10 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        <Button type="primary" block size="large" disabled={!fileList.length} onClick={onNext}>
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
