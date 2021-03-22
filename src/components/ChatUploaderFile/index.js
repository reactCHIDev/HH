/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import deleteFileAC from 'actions/files'
import { useDispatch } from 'react-redux'
import { Upload, message, Button } from 'antd'
import { PaperClipOutlined } from '@ant-design/icons'
import { getItem } from 'utils/localStorage'
import './uploader.less'

const UploaderFile = ({ setFileList, setActiveNext }) => {
  const uploadBtn = useRef(null)
  const dispatch = useDispatch()

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
      if (typeof setActiveNext === 'function') setActiveNext(info.file.status !== 'uploading')
      if (info.file.status === 'removed') {
        dispatch(deleteFileAC(info.file.response.url.split('/').pop()))
        setFileList(info.fileList.map((e) => e?.response?.url))
      }
      if (info.file.status === 'done') {
        setFileList(info.fileList.map((e) => e.response.url))
        message.success(`${info.file.name} file uploaded successful`)
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
