import React, { useState } from 'react'
import { T } from 'lodash/fp'
import { getItem, removeKey } from 'utils/localStorage'
import { history } from 'store'
import QR from 'qrcode'
import Download from 'assets/images/signup-flow/svg/download.svg'
import styles from './finish.module.scss'

const Finish = () => {
  const [qrImgSource, setQrImgSource] = useState(null)

  const hhLink = getItem('link')

  const onClickDashboard = () => {
    removeKey('link')
    history.push('/product_dashboard/profile')
  }
  const onClickListing = () => {
    removeKey('link')
    history.push('/product_dashboard/listings')
  }

  const generateQR = async (text) => {
    try {
      const qr = await QR.toDataURL(text)
      setQrImgSource(qr)
    } catch (err) {
      console.error(err)
    }
  }

  generateQR(hhLink)

  return (
    <>
      <div className={styles.heading_container}>
        <p className={styles.heading}>Your unique URL:</p>
        <a className={styles.adress} href={hhLink}>
          {hhLink}
        </a>
      </div>

      <div className={styles.qr_container}>
        <p className={styles.heading}>Your QR-code</p>
        <div className={styles.qr}>
          <a href={qrImgSource} download="qr.png">
            <img src={qrImgSource} alt="qr" />
          </a>
        </div>
        <button type="button">
          <a href={qrImgSource} download="qr.png">
            <img src={Download} alt="download" />
            Download
          </a>
        </button>
      </div>
      <div className={styles.btn_container}>
        <p className={styles.heading}>What’s next?</p>
        <button className={styles.btn1} onClick={onClickDashboard} type="button">
          To dashboard
        </button>
        <button className={styles.btn2} onClick={onClickListing} type="button">
          Add first listing
        </button>
      </div>
    </>
  )
}

Finish.propTypes = {
  hhLink: T.string,
}

export default Finish
