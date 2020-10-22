import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Upload, Modal } from 'antd'
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

  console.log(fileList)

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

  const handleChange = ({ fileList }) => setOtherPhotos(fileList)

  const submitData = {
    otherPhotos: {
      coverPhoto,
      otherPhotos,
    },
  }

  const submit = () => onSubmit(submitData)

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <>
      <Heading category="About" name="3 - 8 photos of your work" />
      <div className="photo_container">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={otherPhotos}
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
        disabled={otherPhotos.length < 3}
        onClick={submit}
        type="button"
        value="Next  >"
      />
    </>
  )
}

Photo.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
  }),
  onSubmit: T.func,
}

export default Photo
