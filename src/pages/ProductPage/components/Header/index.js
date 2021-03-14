import React from 'react'
import T from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import toggleFavouriteAc from 'actions/favourites'
import LikeIcon from 'assets/icons/svg/like-icon.svg'
import LikeIconGray from 'assets/icons/svg/like-icon-gray.svg'

import ShareIcon from 'assets/icons/svg/share-icon.svg'
import styles from './header.module.scss'
import './header.less'

const Header = ({ text, isFavourite, id }) => {
  const dispatch = useDispatch()
  const [isFavorite, setIsFavorite] = React.useState(isFavourite)
  const [success, setSuccess] = React.useState(false)

  const pathname = useSelector((state) => state.router.location.pathname)

  const likeClick = () => {
    setIsFavorite((f) => !f)
    dispatch(toggleFavouriteAc({ id, type: 'product' }))
  }

  const shareClick = () => {
    window.navigator.clipboard.writeText(`${process.env.REACT_APP_BASE_URL}${pathname}`)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        {/* NOTE: need to add breadcrumbs */}
        {/* <div className={styles.breadCrumbs}>
        </div> */}
      </div>
      <p className={styles.title}>
        {text}
        <span className={styles.btns_wrapper}>
          <span className={styles.like_btn} onClick={likeClick}>
            <img src={isFavorite ? LikeIcon : LikeIconGray} alt="like" />
          </span>
          <span className={styles.like_btn} onClick={shareClick}>
            <img src={ShareIcon} alt="share" />
            {success && <div className={styles.success}>URL is copied to clipboard</div>}
          </span>
        </span>
      </p>
    </div>
  )
}

Header.propTypes = {
  text: T.string,
  isFavourite: T.bool,
  id: T.number,
}

export default Header
