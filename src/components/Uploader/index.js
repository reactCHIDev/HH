/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Upload, Modal } from 'antd'
import ImgCrop from 'antd-img-crop'
import { PlusOutlined } from '@ant-design/icons'
import { getItem } from 'utils/localStorage'
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

const Uploader = ({ list, listSet, cover, setCover, setActiveNext }) => {
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

  const handleChange = ({ fileList, file: { status } }) => {
    if (typeof setActiveNext === 'function') setActiveNext(status !== 'uploading')
    addFileList(fileList)
    listSet(fileList)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const onRemove = (file) => {
    if (file.status === 'error') return true
    return fileList.filter((e) => e.status !== 'error').length > 2
  }

  const onRadio = (e) => {
    const { value } = e.target
    setCover(value)
  }

  const coverMark = (originNode, file) => (
    <div style={{ position: 'relative', width: '100%', height: 150 }}>
      <div style={{ width: '100%', height: 120 }}>{originNode}</div>

      {file.status !== 'error' && (
        <div style={{ position: 'absolute', zIndex: 99, bottom: 0, left: 20 }}>
          <div className={styles.cover_selector}>
            <input
              className={styles.radio_item}
              type="radio"
              key={cover}
              checked={file.uid === cover}
              value={file.uid}
              onChange={onRadio}
            />
            <div>Cover</div>
          </div>
        </div>
      )}
    </div>
  )

  const getToken = () => {
    const accessToken = getItem('authorization-token')
    if (accessToken) {
      return { Authorization: accessToken }
    }
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className="photo_container">
          <ImgCrop rotate aspect={1.4}>
            <Upload
              action={`${process.env.REACT_APP_BASE_URL}/api/v1/file/upload/photo`}
              listType="picture-card"
              fileList={fileList}
              headers={{ 'x-api-key': process.env.REACT_APP_X_API_KEY, ...getToken() }}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={onRemove}
              itemRender={coverMark}
            >
              {fileList.length >= 10 ? null : uploadButton}
            </Upload>
          </ImgCrop>
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
  list: T.arrayOf(T.shape()).isRequired,
  listSet: T.func.isRequired,
  cover: T.string.isRequired,
  setCover: T.func.isRequired,
  min: T.number.isRequired,
}

export default Uploader
