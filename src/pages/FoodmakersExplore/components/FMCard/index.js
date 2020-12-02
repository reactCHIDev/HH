import React from 'react'
import T from 'prop-types'
import avatar from 'assets/TMP-AVATAR.jpg'
import coverPhoto from 'assets/images/landings/foodmakers/fm-leading.jpg'
import people from 'assets/icons/svg/people.svg'
import { Rate } from 'antd'
import cls from 'classnames'
import styles from './fmcard.module.scss'
import './fmcard.less'

const FMCard = (props) => {
  const { x } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.reviewer}>
          <div className={styles.avatar_container}>
            <img src={avatar} alt="avatar" />
          </div>
          <div className={styles.reviewer_info}>
            <p className={styles.reviewer_name}>Gustavs R.
              <div className={cls(styles.review_stats, 'rating')}>
                <Rate style={{ color: '#31394C' }} disabled defaultValue={3} />
                <span>(32)</span>
              </div>
            </p>
            
            <p className={styles.timestamp}>I was born and raised in Latvia. My family has been growing coffee for more than 25 years.</p>
            <p className={styles.autor}>Chief, Chocolatier</p>
            <button className={styles.message_btn}>
              <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="16" height="12.5714" rx="3" stroke="#31394D" stroke-width="2" stroke-linecap="round"/>
                <path d="M2 3L7.83752 7.16966C8.53292 7.66637 9.46708 7.66637 10.1625 7.16966L16 3" stroke="#31394D" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.review}>
          <div className={styles.review_photo}>
            <img className={styles.photo} src={coverPhoto} alt="avatar" />
          </div>
          <div className={styles.review_photo}>
            <img className={styles.photo} src={coverPhoto} alt="avatar" />
          </div>
          <div className={styles.review_photo}>
            <img className={styles.photo} src={coverPhoto} alt="avatar" />
          </div>
          <div className={styles.review_photo}>
            <img className={styles.photo} src={coverPhoto} alt="avatar" />
          </div>
        </div>
      </div>
    </div>
  )
}

FMCard.propTypes = {}

export default FMCard
