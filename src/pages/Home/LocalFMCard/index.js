import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import { Rate } from 'antd'
import Rectangle from 'assets/images/landings/home_page/Rectangle.png'
import Rectangle1 from 'assets/images/landings/home_page/Rectangle (1).png'
import Rectangle2 from 'assets/images/landings/home_page/Rectangle (2).png'
import avatar3 from 'assets/images/landings/home_page/Ellipse 6.png'

import styles from './fmcard.module.scss'
import Tags from 'containers/Auth/components/SignupFlow/steps/Tags/index'

const FMCard = (props) => {
  const { foodmaker } = props
  const {
    id,
    userPhoto,
    coverPhoto,
    otherPhotos,
    firstName,
    about,
    rating,
    votes,
    tags,
  } = foodmaker

  console.log('%c   foodmaker   ', 'color: black; background: gold;', foodmaker)
  return (
    <div className={styles.local_makers_col}>
      <div className={styles.local_makers_col_bg}>
        <ul className={styles.local_img_box}>
          <li>
            <img src={coverPhoto} alt="img" />
          </li>
          <li>
            <img src={otherPhotos[0]} alt="img" />
          </li>
          <li>{otherPhotos[1] && <img src={otherPhotos[1]} alt="img" />}</li>
        </ul>
        <div className={styles.local_bottom_box}>
          <Link to={{ pathname: '/foodmaker_page', state: id }}>
            <div className={styles.local_avatar_info}>
              <div className={styles.local_avatar_box}>
                <img src={userPhoto} alt="avatar" />
              </div>
              <p className={styles.local_name}>
                {firstName}
                <p>{tags.join(', ')}</p>
                {/* <p>Chef, Chocolatier</p> */}
              </p>
            </div>
          </Link>
          <div className={styles.local_raiting_holder}>
            <Rate style={{ color: '#31394C' }} disabled defaultValue={3} /* value={rating} */ />
            <p>4,3 for 32 experiences</p>
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
