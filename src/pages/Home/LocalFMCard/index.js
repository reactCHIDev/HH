import React from 'react'
import T from 'prop-types'
import { Rate } from 'antd'
import styles from './fmcard.module.scss'

const FMCard = (props) => {
  const { foodmaker, pushRoute } = props
  const {
    profileName,
    userPhoto,
    coverPhoto,
    otherPhotos,
    firstName,
    about,
    rating,
    votes,
    tags,
  } = foodmaker

  const openFoodmaker = () => pushRoute(`/${profileName}`)

  return (
    <div className={styles.local_makers_col}>
      <div className={styles.local_makers_col_bg}>
        <ul className={styles.local_img_box}>
          <li>
            <div
              className={styles.img_box_frame}
              style={{ backgroundImage: `url("${coverPhoto}")` }}
            ></div>
          </li>
          <li>
            <div
              className={styles.img_box_frame}
              style={{ backgroundImage: `url("${otherPhotos[0]}")` }}
            ></div>
          </li>
          <li>
            <div
              className={styles.img_box_frame}
              style={{ backgroundImage: `url("${otherPhotos[1]}")` }}
            >
              {' '}
            </div>
          </li>
        </ul>
        <div className={styles.local_bottom_box}>
          <div className={styles.local_avatar_info} onClick={openFoodmaker}>
            <div className={styles.local_avatar_box}>
              <img src={userPhoto} alt="avatar" />
            </div>
            <p className={styles.local_name}>
              {firstName}
              <p>{tags.join(', ')}</p>
            </p>
          </div>
          <div className={styles.local_raiting_holder}>
            <Rate style={{ color: '#31394C' }} disabled defaultValue={3} /* value={rating} */ />
            {/* <p>4,3 for 32 experiences</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

FMCard.propTypes = {
  a: T.number.isRequired,
  b: T.string.isRequired,
  c: T.bool.isRequired,
  f: T.func.isRequired,
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
      content: T.node,
    }).isRequired,
  }).isRequired,
}

export default FMCard
