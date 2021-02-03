/* eslint-disable react/prop-types */
import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { Rate, Tag } from 'antd'
import isProductAvailable from 'utils/isProductAvailable'
import sec21 from 'assets/images/landings/create_profile/sec21.jpg'
import expLike from 'assets/icons/svg/exp_like.svg'
import expLikeRed from 'assets/icons/svg/exp_like_red.svg'

import OutlinedCartIcon from 'assets/icons/svg/cart-outlined-icon.svg'
import CheckedWhite from 'assets/icons/svg/check_white.svg'

import { useDispatch, useSelector } from 'react-redux'
import { addProductToBasket } from 'actions/cart'
import toggleFavouriteAc from 'actions/favourites'

import styles from './prod_card.module.scss'
import './prod_card.less'

const ProdCard = (props) => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.cart.products)
  const isRequesting = useSelector((state) => state.cart.isRequesting)

  const { id, photo, tags, name, price, rating, isShowCart, pushRoute, pathname, product } = props

  const [isFavourite, setIsFavourite] = React.useState(product.isFavorite)

  const onClick = () => pushRoute(`${pathname}/${id}`)

  const onProductClick = (productData) => {
    if (isRequesting) {
      return
    }
    dispatch(addProductToBasket(productData))
  }

  const onLikeCLick = () => {
    setIsFavourite((f) => !f)
    dispatch(toggleFavouriteAc({ id, type: 'product' }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {product.hitmark === 'Hit' ? <div className={styles.hit_container}>HIT</div> : null}
        <div
          className={styles.img_container}
          style={{ backgroundImage: `url("${photo || sec21}")` }}
        >
          <img
            onClick={() => onLikeCLick()}
            className={styles.card_like}
            src={isFavourite ? expLikeRed : expLike}
            alt="explike"
          />
          <div className={cls('tags', styles.tags_container)}>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className={styles.info_container}>
          <p className={styles.exp_title} onClick={onClick}>
            {name}
          </p>
          <div className={styles.stats_container}>
            <div className={styles.exp_price_container}>
              <p className={styles.exp_price}>{`$${price}`}</p>
              {isShowCart && (
                <img
                  src={products.includes(id) ? CheckedWhite : OutlinedCartIcon}
                  className={
                    isProductAvailable(product) ? styles.outlined_cat : styles.outlined_cat_empty
                  }
                  style={
                    products.includes(id)
                      ? {
                          width: '40px',
                          height: '40px',
                          padding: '10px',
                          background: '#7AD398',
                          borderRadius: '8px',
                        }
                      : {}
                  }
                  alt="buy product"
                  onClick={() => {
                    if (isProductAvailable(product)) onProductClick(product)
                  }}
                />
              )}
            </div>
            <div className={cls(styles.rating_container, 'rating')}>
              <Rate style={{ color: '#31394C' }} disabled value={rating} />
              <p className={styles.qauntity}>{`(${product.votes})`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ProdCard.propTypes = {
  photo: T.string,
  tags: T.arrayOf(T.string),
  name: T.string,
  price: T.number,
  rating: T.number,
  isShowCart: T.bool,
  id: T.number.isRequired,
  pathname: T.string.isRequired,
  pushRoute: T.func.isRequired,
}

ProdCard.defaultProps = {
  tags: [],
  name: 'Boring Indian Curry Workshop',
  price: 650,
  rating: 3,
  rateCount: 8,
  isShowCart: false,
}

export default ProdCard
