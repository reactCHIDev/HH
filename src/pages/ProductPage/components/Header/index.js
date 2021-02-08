import React from 'react'
import T from 'prop-types'
import { useDispatch } from 'react-redux'
import toggleFavouriteAc from 'actions/favourites'
import LikeIcon from 'assets/icons/svg/like-icon.svg'
import LikeIconGray from 'assets/icons/svg/like-icon-gray.svg'

import ShareIcon from 'assets/icons/svg/share-icon.svg'
import styles from './header.module.scss'
import './header.less'

const Header = ({ text, isFavourite, id }) => {
  const dispatch = useDispatch()
  const [isFavorite, setIsFavorite] = React.useState(isFavourite)

  const onLikeCLick = () => {
    setIsFavorite((f) => !f)
    dispatch(toggleFavouriteAc({ id, type: 'product' }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        {/* NOTE: need to add breadcrumbs */}
        {/* <div className={styles.breadCrumbs}>
        </div> */}
        <div className={styles.buttons}>
          <img
            onClick={() => onLikeCLick()}
            src={isFavorite ? LikeIcon : LikeIconGray}
            alt="like"
          />
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
  isFavourite: T.bool.isRequired,
  id: T.number.isRequired,
}

export default Header
