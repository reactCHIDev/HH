/* eslint-disable react/prop-types */
import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { Rate, Tag } from 'antd'
import sec21 from 'assets/images/landings/create_profile/sec21.jpg'
import expLike from 'assets/icons/svg/exp_like.svg'
import OutlinedCartIcon from 'assets/icons/svg/cart-outlined-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToBasket } from 'actions/cart'
import styles from './prod_card.module.scss'
import './prod_card.less'

const ProdCard = (props) => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.cart.products)

  const {
    id,
    photo,
    tags,
    name,
    price,
    rating,
    rateCount,
    isShowCart,
    pushRoute,
    pathname,
    product,
  } = props

  const onClick = () => pushRoute(`${pathname}/${id}`)

  const onProductClick = (productData) => {
    dispatch(addProductToBasket(productData))
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div
          className={styles.img_container}
          style={{ backgroundImage: `url("${photo || sec21}")` }}
        >
          <img className={styles.card_like} src={expLike} alt="explike" />
          {/* <img className={styles.card_img} src={photo ?? sec21} alt="cardimg" /> */}
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
                  src={OutlinedCartIcon}
                  className={
                    product.quantity === 0 ? styles.outlined_cat_empty : styles.outlined_cat
                  }
                  style={
                    products.includes(product.title)
                      ? { background: '#b4f8b4', borderRadius: '8px' }
                      : {}
                  }
                  alt="buy product"
                  onClick={() => {
                    if (product.quantity === 0) {
                      return
                    }
                    onProductClick(product)
                  }}
                />
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

ProdCard.propTypes = {
  photo: T.string,
  tags: T.arrayOf(T.string),
  name: T.string,
  price: T.number,
  rating: T.number,
  rateCount: T.number,
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
