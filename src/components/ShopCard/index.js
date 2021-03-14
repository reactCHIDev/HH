import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import cls from 'classnames'
import { Rate, Tag } from 'antd'

import { useDispatch } from 'react-redux'
import toggleFavouriteAc from 'actions/favourites'

import expLike from 'assets/icons/svg/exp_like.svg'
import expLikeRed from 'assets/icons/svg/exp_like_red.svg'

import OutlinedCartIcon from 'assets/icons/svg/cart-outlined-icon.svg'
import styles from './shop_card.module.scss'
import './shop_card.less'

const ShopCard = (props) => {
  const {
    photo,
    tags,
    name,
    rating,
    rateCount,
    isShowCart,
    pathname,
    // state,
    isFavorite,
    id,
  } = props

  const dispatch = useDispatch()
  const [isFavourite, setIsFavourite] = React.useState(isFavorite)

  const onLikeCLick = () => {
    setIsFavourite((f) => !f)
    dispatch(toggleFavouriteAc({ id, type: 'exp' }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.img_container}>
          <img
            className={styles.card_like}
            alt="explike"
            onClick={() => onLikeCLick()}
            src={isFavourite ? expLikeRed : expLike}
          />
          <img className={styles.card_img} src={photo} alt="cardimg" />
          <div className={cls('tags', styles.tags_container)}>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className={styles.info_container}>
          <Link className={styles.card_link} to={`/shop/${pathname.split('/').pop()}`}>
            <p className={styles.exp_title}>{name}</p>
          </Link>
          <div className={styles.stats_container}>
            <div className={styles.exp_price_container}>
              <p className={styles.exp_price}>``</p>
              {isShowCart && (
                <img src={OutlinedCartIcon} className={styles.outlined_cat} alt="buy product" />
              )}
            </div>
            <div className={cls(styles.rating_container, 'rating')}>
              <Rate style={{ color: '#31394C' }} disabled value={rating} />
              <p className={styles.qauntity}>{`(${rateCount})`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ShopCard.propTypes = {
  photo: T.string,
  tags: T.arrayOf(T.string),
  name: T.string,
  rating: T.number,
  rateCount: T.number,
  isShowCart: T.bool,
  pathname: T.string,
  isFavorite: T.bool,
  id: T.number,
}

ShopCard.defaultProps = {
  tags: [],
  name: 'Boring Indian Curry Workshop',
  price: 650,
  rating: 3,
  rateCount: 8,
  isShowCart: false,
}

export default ShopCard
