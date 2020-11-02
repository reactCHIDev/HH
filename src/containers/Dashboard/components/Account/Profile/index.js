import React, { useState } from 'react'
import T from 'prop-types'
import EditIcon from 'assets/icons/svg/editor-icon.svg'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import styles from './profile.module.scss'
import './profile.less'

const Profile = ({ profileName }) => {
  const [fileList, setFileList] = useState([])
  const [name, setName] = useState(profileName)

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onChangeInput = (e) => setName(e.target.value)

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }

  return (
    <div className={styles.info_container}>
      <div className={styles.data_container}>
        <p className={styles.head}>Profile</p>
        <p className={styles.subhead}>User info</p>
        <div id="uploader" className={styles.uploader}>
          <ImgCrop rotate>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </ImgCrop>
          <p className={styles.change_photo}>CHANGE USER’S PHOTO</p>
        </div>
        <div className={styles.name_section}>
          <div className={styles.content}>
            <p className={styles.label}>Name</p>
            <input
              className={styles.input_name}
              type="text"
              onChange={onChangeInput}
              value={name}
            />
          </div>
          <div className={styles.edit_icon}>
            <img src={EditIcon} alt="edit" />
          </div>
        </div>
      </div>
      <div className={styles.rewards}>
        <p className={styles.heading}>Rewards earned</p>
        <p className={styles.main}>
          <span className={styles.hundred}>{'100'}</span>Hunger Hugger points
        </p>
      </div>
    </div>
  )
}

Profile.propTypes = {
  a: T.number.isRequired,
  b: T.string.isRequired,
  c: T.bool.isRequired,
  f: T.func.isRequired,
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
      content: T.node,
    }).isRequired,
  }).isRequired,
}

export default Profile
