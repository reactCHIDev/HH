/* eslint-disable react/prop-types */
import React from 'react'
import avatar from 'assets/TMP-AVATAR.jpg'
import coverPhoto from 'assets/images/landings/foodmakers/fm-leading.jpg'
import AvatarPlaceholder from 'components/AvatarPlaceholder'
import { Rate } from 'antd'
import cls from 'classnames'
import styles from './fmcard.module.scss'
import './fmcard.less'

const FMCard = ({ item }) => {
  return (
    <div className={styles.container} key={item.id}>
      <div className={styles.content}>
        <div className={styles.reviewer}>
          <div className={styles.avatar_container}>
            {item.userPhoto ? (
              <img src={item.userPhoto || avatar} alt="avatar" />
            ) : (
              <AvatarPlaceholder width={96} />
            )}
          </div>
          <div className={styles.reviewer_info}>
            <p className={styles.reviewer_name}>
              {item.firstName} {item.lastName.charAt(0)}.
              <div className={cls(styles.review_stats, 'rating')}>
                <Rate style={{ color: '#31394C' }} disabled defaultValue={item.rating} />
                <span>({`${item.votes || 0}`})</span>
              </div>
            </p>

            <p className={styles.timestamp}>{item.about}</p>
            <p className={styles.autor}>
              {item.tags && item.tags.map((el, i) => <span key={el}>{(i ? ', ' : '') + el}</span>)}
            </p>
            <button type="button" className={styles.message_btn}>
              <svg
                width="18"
                height="15"
                viewBox="0 0 18 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="16"
                  height="12.5714"
                  rx="3"
                  stroke="#31394D"
                  // stroke-width="2"
                  // stroke-linecap="round"
                />
                <path
                  d="M2 3L7.83752 7.16966C8.53292 7.66637 9.46708 7.66637 10.1625 7.16966L16 3"
                  stroke="#31394D"
                  // stroke-width="2"
                  // stroke-linecap="round"
                />
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
