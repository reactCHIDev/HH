import React from 'react'
import { history } from 'store'
import Download from 'assets/images/signup-flow/svg/download.svg'
import styles from './finish.module.scss'

const Finish = () => {
  const onClick = () => {
    history.push('/')
  }
  return (
    <>
      <div className={styles.heading_container}>
        <p className={styles.heading}>Your unique URL:</p>
        <p className={styles.adress}>www.hungryhugger.com/annettechef</p>
      </div>
      <div className={styles.qr_container}>
        <p className={styles.heading}>Your QR-code</p>
        <div className={styles.qr}>
          <img src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100" />
        </div>
        <button type="button">
          <a
            href="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100"
            download="qr.png"
          >
            <img src={Download} alt="download" />
            Download
          </a>
        </button>
      </div>
      <div className={styles.btn_container}>
        <p className={styles.heading}>What’s next?</p>
        <button className={styles.btn1} onClick={onClick} type="button">
          To dashboard
        </button>
        <button className={styles.btn2} onClick={onClick} type="button">
          Add first listing
        </button>
      </div>
    </>
  )
}

Finish.propTypes = {}

export default Finish
