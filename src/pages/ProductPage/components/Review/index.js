import React from 'react'
import T from 'prop-types'
import avatar from 'assets/TMP-AVATAR.jpg'
import coverPhoto from 'assets/images/landings/foodmakers/fm-leading.jpg'
import people from 'assets/icons/svg/people.svg'
import { Rate } from 'antd'
import cls from 'classnames'
import styles from './review.module.scss'
import './review.less'

const Review = ({ el }) => {
  const getDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.reviewer}>
          <div className={styles.avatar_container}>
            <img src={el.customer.userPhoto} alt="avatar" />
          </div>
          <div className={styles.reviewer_info}>
            <p className={styles.reviewer_name}>{el.customer.profileName}</p>
            <p className={styles.timestamp}>Visit: {getDate(el.createdAt)}</p>
          </div>
        </div>
        <div className={styles.review}>
          <div className={cls(styles.review_stats, 'rating')}>
            <Rate style={{ color: '#31394C' }} disabled defaultValue={el.rating} />
            {/*
            <div className={styles.reads}> 
             <div className={styles.reads_people}>
                <img className={styles.people} src={people} alt="avatar" />
              </div>
              <div className={styles.qty_reads}>4</div> 
            </div> 
            */}
            <div className={styles.date}>{getDate(el.createdAt)}</div>
          </div>
          <div className={styles.review_content}>{el.review}</div>
          {/* <div className={styles.review_page}>
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
          </div> */}
        </div>
      </div>
    </div>
  )
}

Review.propTypes = {}

export default Review
