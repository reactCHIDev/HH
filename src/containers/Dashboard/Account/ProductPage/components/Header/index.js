import React from 'react'
import T from 'prop-types'
import LikeIcon from 'assets/icons/svg/like-icon.svg'
import ShareIcon from 'assets/icons/svg/share-icon.svg'
import styles from './header.module.scss'
import './header.less'

const Header = ({ text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        {/* NOTE: need to add breadcrumbs */}
        {/* <div className={styles.breadCrumbs}>
        </div> */}
        <div className={styles.buttons}>
          <img src={LikeIcon} alt="like" />
          <img src={ShareIcon} alt="share" />
        </div>
      </div>
      <div className={styles.title}>
        <p>{text}</p>
      </div>
    </div>
  )
}

Header.propTypes = {
  text: T.string.isRequired,
}

export default Header
