import React, { useState } from 'react'
import T from 'prop-types'
import downloadIcon from 'assets/icons/svg/download.svg'
import styles from './preview.module.scss'

const PreviewIcon = ({ fileLink, setPreview }) => {
  const pics = ['jpg', 'jpeg', 'png']

  const showPreview = () => {
    setPreview(fileLink)
  }

  return (
    <>
      {pics.includes(fileLink.split('.').pop()) ? (
        <div className={styles.preview_link} onClick={showPreview}>
          <div className={styles.file_link_wrapper}>
            <div
              className={styles.image_container}
              style={{ backgroundImage: `url("${fileLink}")` }}
            />
            <div className={styles.file_descr}>{'.' + fileLink.split('.').pop()}</div>
          </div>
        </div>
      ) : (
        <a className={styles.preview_link} href={fileLink} download="file">
          <div className={styles.file_link_wrapper}>
            <img className={styles.file_icon} src={downloadIcon} alt="dload" />
            <div className={styles.file_descr}>{'File.' + fileLink.split('.').pop()}</div>
          </div>
        </a>
      )}
    </>
  )
}

PreviewIcon.propTypes = {
  fileLink: T.string.isRequired,
}

export default PreviewIcon
