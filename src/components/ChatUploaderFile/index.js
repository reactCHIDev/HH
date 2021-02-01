import React, { useState, useEffect, useRef } from 'react'
import T from 'prop-types'
import { Upload, message, Button } from 'antd'
import { PaperClipOutlined } from '@ant-design/icons'
import { getItem } from 'utils/localStorage'
import styles from './uploader.module.scss'
import './uploader.less'

const UploaderFile = ({ setFileList }) => {
  const uploadBtn = useRef(null)

  const getToken = () => {
    const accessToken = getItem('authorization-token')
    if (accessToken) {
      return { Authorization: accessToken }
    }
    return null
  }

  const props = {
    name: 'file',
    action: `${process.env.REACT_APP_BASE_URL}/api/v1/file/upload/photo`,
    headers: { 'x-api-key': process.env.REACT_APP_X_API_KEY, ...getToken(), From: 'message' },
    onChange(info) {
      if (info.file.status === 'removed') {
        setFileList(info.fileList.map((e) => e?.response?.url))
      }
      if (info.file.status === 'done') {
        setFileList(info.fileList.map((e) => e.response.url))
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <div className="chat-uploader">
      <Upload {...props}>
        <Button icon={<PaperClipOutlined />} size="large" ref={uploadBtn} />
      </Upload>
    </div>
  )
}

UploaderFile.propTypes = {}

export default UploaderFile
