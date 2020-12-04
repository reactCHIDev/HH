import React, { useState } from 'react'
import T from 'prop-types'
import axios from 'axios'
import { getItem } from 'utils/localStorage'
import { Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import './ava.less'

const Avatar = ({ avatarUrl, setAvatar }) => {
  const [loading, setLoading] = useState(false)

  const sendFile = async (options) => {
    const { onSuccess, onError, file, onProgress } = options
    const formData = new FormData()
    formData.append('file', file)
    const getToken = () => {
      const accessToken = getItem('authorization-token')
      if (accessToken) {
        return { Authorization: accessToken }
      }
      return null
    }
    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
      'x-api-key': process.env.REACT_APP_X_API_KEY,
      ...getToken(),
    }
    try {
      const res = await axios.post(
        'https://hungryhugger.wildwebart.com/api/v1/file/upload/photo',
        formData,
        {
          headers,
          /* onUploadProgress: (event) => {
            const percent = Math.floor((event.loaded / event.total) * 100)
            setProgress(percent)
            if (percent === 100) {
              setTimeout(() => setProgress(0), 3000)
            }
            onProgress({ percent: (event.loaded / event.total) * 100 })
          }, */
        },
      )
      setAvatar(res.data)
      setLoading(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <div className="avatar_uploader_wrapper">
      <ImgCrop rotate>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          customRequest={sendFile}
          showUploadList={false}
          // beforeUpload={beforeUpload}
          // onChange={this.handleChange}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="avatar" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </ImgCrop>
    </div>
  )
}

Avatar.propTypes = {
  avatarUrl: T.string,
}

export default Avatar
