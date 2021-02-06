import React from 'react'
import T from 'prop-types'
import downloadIcon from 'assets/icons/svg/download.svg'
import styles from './modal-preview.module.scss'

const ModalPreview = (props) => {
  const { link, closeFunc } = props

  return (
    <div className={styles.modal_img_wrapper} onClick={closeFunc}>
      <img src={link} alt="picture" />
      <div className={styles.download_btn}>
        <a className={styles.preview_link} href={link} download="file">
          <div className={styles.file_link_wrapper}>
            <img className={styles.file_icon} src={downloadIcon} alt="dload" />
            <div className={styles.download_text}>Download</div>
          </div>
        </a>
      </div>
    </div>
  )
}

ModalPreview.propTypes = {}

export default ModalPreview
