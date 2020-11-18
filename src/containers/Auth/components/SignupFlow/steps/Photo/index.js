import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Upload, Modal } from 'antd'
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
  const [fileList, addFileList] = useState([])

  useEffect(() => {
    setCoverPhoto(value.coverPhoto)
    setOtherPhotos(value.otherPhotos)
  }, [])

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

  const handleChange = ({ fileList }) => addFileList(fileList)

  const submit = () => {
    const submitData = {
      otherPhotos: {
        coverPhoto: fileList.length > 0 ? fileList[0].response.url : '',
        otherPhotos: fileList.length > 1 ? fileList.slice(1).map((e) => e.response.url) : [],
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

  async function sendFile({ file }) {
    console.log('%c   fileList   ', 'color: darkgreen; background: palegreen;', file)
    const formData = new FormData()
    formData.append('file', file)
    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
      'x-api-key': '11edff01b8c5e3cfa0027fd313365f264b',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsQGJpZ2RpZy5jb20udWEiLCJwcm9maWxlTmFtZSI6IkFsZXhGTSIsInJvbGUiOiJGT09ETUFLRVIiLCJpYXQiOjE2MDUyNzU5Nzh9.QluuzPvYk3e4g_mMFD-mVvnWJknyl1OIxz3fAwuemzc',
    }

    const res = await axios.post(
      'https://hungryhugger.wildwebart.com/api/v1/file/upload/photo',
      formData,
      {
        headers,
      },
    )

    console.log('res', res)
  }

  const headers = {
    'Content-Type': 'multipart/form-data',
    type: 'formData',
    'x-api-key': '11edff01b8c5e3cfa0027fd313365f264b',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsQGJpZ2RpZy5jb20udWEiLCJwcm9maWxlTmFtZSI6IkFsZXhGTSIsInJvbGUiOiJGT09ETUFLRVIiLCJpYXQiOjE2MDUyNzU5Nzh9.QluuzPvYk3e4g_mMFD-mVvnWJknyl1OIxz3fAwuemzc',
  }

  return (
    <div className={styles.container}>
      <Heading category="About" name="3 - 8 photos of your work" />
      <div className="photo_container">
        <Upload
          action="https://hungryhugger.wildwebart.com/api/v1/file/upload/photo"
          customRequest={sendFile}
          // headers={headers}
          listType="picture-card"
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
      <p className={styles.description}>
        Show your work at its best! This directly affects the number of orders.
      </p>
      <input
        className={styles.next}
        disabled={fileList.length < 3}
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
