/* eslint-disable react/prop-types */
import React from 'react'
import { Rate } from 'antd'
import AvatarPlaceholder from 'components/AvatarPlaceholder'
import styles from './fmcard.module.scss'

const FMCard = (props) => {
  const { foodmaker, pushRoute } = props
  const {
    hungryHuggerLink,
    userPhoto,
    coverPhoto,
    otherPhotos,
    profileName,
    tags,
    rating,
  } = foodmaker

  const [clickPosition, setClickPosition] = React.useState(0)

  const mouseDown = (e) => {
    setClickPosition({
      cursorX: e.pageX,
      cursorY: e.pageY,
    })
  }

  const mouseUp = (e) => {
    if (
      Math.abs(clickPosition.cursorX - e.pageX) < 5 &&
      Math.abs(clickPosition.cursorY - e.pageY) < 5
    ) {
      pushRoute(`/${hungryHuggerLink.split('/').pop()}`)
    }
  }

  return (
    <div className={styles.local_makers_col}>
      <div className={styles.local_makers_col_bg}>
        <ul className={styles.local_img_box}>
          <li>
            <div
              className={styles.img_box_frame}
              style={{ backgroundImage: `url("${coverPhoto}")` }}
            />
          </li>
          <li>
            <div
              className={styles.img_box_frame}
              style={{ backgroundImage: `url("${otherPhotos[0]}")` }}
            />
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
          <div className={styles.local_avatar_info} onMouseDown={mouseDown} onMouseUp={mouseUp}>
            <div className={styles.local_avatar_box}>
              {userPhoto ? <img src={userPhoto} alt="avatar" /> : <AvatarPlaceholder />}
            </div>
            <div className={styles.local_name}>
              {profileName}
              <p>{tags.join(', ')}</p>
            </div>
          </div>
          <div className={styles.local_raiting_holder}>
            <Rate
              style={{ color: '#31394C' }}
              disabled
              defaultValue={rating} /* value={rating} */
            />
            {/* <p>4,3 for 32 experiences</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

FMCard.propTypes = {}

export default FMCard
