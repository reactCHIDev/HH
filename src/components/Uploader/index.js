import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Button from 'components/Button'
import styles from './uploader.module.scss'
import './uploader.less'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const Uploader = ({ list, listSet, cover, setCover, min }) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, addFileList] = useState(list)

  useEffect(() => {
    addFileList(list)
  }, [list])

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
    addFileList(fileList)
    listSet(fileList)
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
        <div className="photo_container">
          <Upload
            action={`${process.env.REACT_APP_BASE_URL}/api/v1/file/upload/photo`}
            listType="picture-card"
            fileList={fileList}
            headers={{ 'x-api-key': process.env.REACT_APP_X_API_KEY }}
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
      </div>
    </div>
  )
}

Uploader.propTypes = {
  list: T.arrayOf(T.string).isRequired,
  listSet: T.func.isRequired,
  cover: T.number.isRequired,
  setCover: T.func.isRequired,
  min: T.number.isRequired,
}

export default Uploader
