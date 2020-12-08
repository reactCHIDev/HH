import React from 'react'
import T from 'prop-types'
import Rectangle from 'assets/images/landings/home_page/Rectangle.png'
import Rectangle1 from 'assets/images/landings/home_page/Rectangle (1).png'
import Rectangle2 from 'assets/images/landings/home_page/Rectangle (2).png'
import avatar3 from 'assets/images/landings/home_page/Ellipse 6.png'

import styles from './fmcard.module.scss'

const FMCard = (props) => {
  const { x } = props

  return (
    <div className={styles.local_makers_col}>
      <div className={styles.local_makers_col_bg}>
        <ul className={styles.local_img_box}>
          <li>
            <img src={Rectangle} alt="img" />
          </li>
          <li>
            <img src={Rectangle1} alt="img" />
          </li>
          <li>
            <img src={Rectangle2} alt="img" />
          </li>
        </ul>
        <div className={styles.local_bottom_box}>
          <div className={styles.local_avatar_info}>
            <div className={styles.local_avatar_box}>
              <img src={avatar3} alt="avatar" />
            </div>
            <p className={styles.local_name}>
              Kaspar N.
              <p>Chief, Chocolatier</p>
            </p>
          </div>
          <div className={styles.local_raiting_holder}>
            rating-block
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
