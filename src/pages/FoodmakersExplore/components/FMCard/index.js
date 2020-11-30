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
            <p className={styles.reviewer_name}>Gustavs R.</p>
            <p className={styles.timestamp}>Visit: 12 May, 20</p>
          </div>
        </div>
        <div className={styles.review}>
          <div className={styles.review_header}>
            <div className={styles.cover_photo}>
              <img src={coverPhoto} alt="avatar" />
            </div>
            <div className={styles.title}>Cultural Dinner: Art, Music and Fun</div>
          </div>
          <div className={cls(styles.review_stats, 'rating')}>
            <Rate style={{ color: '#31394C' }} disabled defaultValue={3} />
            <div className={styles.reads}>
              <div className={styles.reads_people}>
                <img className={styles.people} src={people} alt="avatar" />
              </div>
              <div className={styles.qty_reads}>4</div>
            </div>
            <div className={styles.date}>22 May</div>
          </div>
          <div className={styles.review_content}>
            Super cool gin program they have going here. All the different infusions are super
            interesting. Сocktails, was a great time. Super cool gin program they have going here.
            All the different infusions are super interesting. Got to make some cocktails, was a
            great time.
          </div>
          <div className={styles.review_page}>
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
    </div>
  )
}

FMCard.propTypes = {}

export default FMCard
