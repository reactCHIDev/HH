import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import cls from 'classnames'
import { Rate, Tag } from 'antd'

import sec21 from 'assets/images/landings/create_profile/sec21.jpg'
import expLike from 'assets/icons/svg/exp_like.svg'
import OutlinedCartIcon from 'assets/icons/svg/cart-outlined-icon.svg'
import styles from './prod_card.module.scss'
import './prod_card.less'

const ProdCard = (props) => {
  const { photo, tags, name, price, rating, rateCount, isShowCart, pathname, state } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.img_container}  style={{ backgroundImage: `url("${photo ?? sec21}")` }}>
          <img className={styles.card_like} src={expLike} alt="explike" />
          {/* <img className={styles.card_img} src={photo ?? sec21} alt="cardimg" /> */}
          <div className={cls('tags', styles.tags_container)}>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className={styles.info_container}>
          <Link className={styles.card_link} to={{ pathname, state }}>
            <p className={styles.exp_title}>{name}</p>
          </Link>
          <div className={styles.stats_container}>
            <div className={styles.exp_price_container}>
              <p className={styles.exp_price}>{`$${price}`}</p>
              {isShowCart && (
                <img src={OutlinedCartIcon} className={styles.outlined_cat} alt="buy product" />
              )}
            </div>
            <div className={cls(styles.rating_container, 'rating')}>
              <Rate style={{ color: '#31394C' }} disabled defaultValue={3} value={rating} />
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
