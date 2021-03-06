/* eslint-disable no-shadow */
import React, { useState, useEffect, useRef } from 'react'
import T from 'prop-types'
import Button from 'components/Button'
import EditIcon from 'assets/icons/svg/editor-icon.svg'
import AvaUploader from 'components/AvatarUploader'
import { connect } from 'react-redux'
import { getItem } from 'utils/localStorage'
import { getUserAccount, updatePhotoNameAC } from 'actions/account'
import styles from './profile.module.scss'
import './profile.less'

const Profile = ({ account, getUserAccount, updatePhotoNameAC }) => {
  const { success } = account

  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')

  const userNameField = useRef(null)

  const onSubmit = () => {
    const payload = {}
    if (name !== account.profileName) payload.profileName = name
    if (avatar) payload.userPhoto = avatar
    updatePhotoNameAC(payload)
  }

  useEffect(() => {
    const id = getItem('user-id')
    if (id) getUserAccount(id)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (success) {
      const id = getItem('user-id')
      if (id) getUserAccount(id)
    }
    // eslint-disable-next-line
  }, [success])

  useEffect(() => {
    setName(account.profileName)
    setAvatar(account?.userPhoto || '')
  }, [account])

  /*  useEffect(() => {
    if (account.userPhoto) setFileList({ url: account.userPhoto, uid: '-1' })
  }, [account]) */

  const onChangeInput = (e) => setName(e.target.value)

  const changePhoto = () => {
    setAvatar('')
  }

  const editUsername = () => {
    setName('')
    userNameField.current.focus()
  }

  return (
    <div className={styles.info_container}>
      <div className={styles.data_container}>
        <p className={styles.subhead}>User info</p>
        <div id="uploader" className={styles.uploader}>
          {success && <div className={styles.success}>Saved successful</div>}
          <AvaUploader avatarUrl={avatar} setAvatar={setAvatar} />
          <p className={styles.change_photo} onClick={changePhoto}>
            CHANGE USER???S PHOTO
          </p>
        </div>
        <div className={styles.name_section}>
          <div className={styles.content}>
            <p className={styles.label}>Username</p>
            <input
              ref={userNameField}
              className={styles.input_name}
              type="text"
              onChange={onChangeInput}
              value={name}
            />
          </div>
          <div className={styles.edit_icon} onClick={editUsername}>
            <img src={EditIcon} alt="edit" />
          </div>
        </div>
        <div className={styles.btn_container}>
          <Button title="SAVE" onClick={onSubmit} />
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
  profileName: T.string,
  getUserAccount: T.func,
  updatePhotoNameAC: T.func,
  account: T.shape(),
}

export default connect(({ account }) => ({ account }), { getUserAccount, updatePhotoNameAC })(
  Profile,
)
