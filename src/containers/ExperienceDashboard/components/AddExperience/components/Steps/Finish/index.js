import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import styles from './finish.module.scss'

const Finish = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.text}>Congratualtion for posting your first experience!</p>
        <p className={styles.text}> Whats next?</p>
        <p className={styles.heading}>Tell your community where to find you</p>
        <div className={styles.share_block}>
          <p className={styles.share}>Share experience url</p>
          <Link to="">hungruhugger.com/makers/willywonka</Link>
          <div className={styles.btn_apply}>
            <Button
              block
              // disabled={fileList.length < 2 || !isActive}
              size="large"
            >
              COPY URL
            </Button>
          </div>
        </div>
        <div className={styles.btn_complete}>
          <Button
            type="primary"
            block
            // disabled={fileList.length < 2 || !isActive}
            size="large"
          >
            Back to the dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

Finish.propTypes = {}

export default Finish
