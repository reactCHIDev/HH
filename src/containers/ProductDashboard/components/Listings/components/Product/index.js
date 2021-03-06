/* eslint-disable react/prop-types */
import React from 'react'
import T from 'prop-types'
import { setItem } from 'utils/localStorage'
import { Link } from 'react-router-dom'
import cls from 'classnames'
import EditIcon from 'assets/icons/svg/editor-icon.svg'
import ChkIcon from 'assets/icons/svg/chk-icon.svg'
import DashIcon from 'assets/icons/svg/dash-icon.svg'
import { Rate } from 'antd'
import Option from 'components/Option'
import styles from './product.module.scss'
import './product.less'

const Product = ({ product, pushRoute, onToggle }) => {
  const { id, coverPhoto, title, rating, status, parameters, available } = product

  const onClick = () => setItem('addProduct', product)

  const openProduct = () => pushRoute(`/product/${product.id}`)

  return (
    <div className={styles.tr}>
      <div className={styles.td}>
        <div className={styles.description}>
          <div className={styles.description_content}>
            <div
              className={styles.image_container}
              style={{ backgroundImage: `url("${coverPhoto}")` }}
            >
              {/*  <img src={coverPhoto} alt="product" /> */}
            </div>

            <div className={styles.product_option} onClick={openProduct}>
              <span className={styles.product_name}>{title}</span>
              <div className={styles.status_option_container}>
                <Option checked={status === 'PUBLISHED'} onChange={onToggle} id={id} />
              </div>
            </div>
          </div>

          <div className={styles.edit_btn_container} onClick={onClick}>
            <Link to={{ pathname: '/addproduct', state: 'edit' }}>
              <img className={styles.edit_btn_img} src={EditIcon} alt="edit" />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.td}>
        <div className={cls(styles.rating_container, 'rating')}>
          <Rate style={{ color: '#3C3E43' }} disabled defaultValue={rating} />
        </div>
      </div>
      <div className={cls(styles.td, styles.td_hidden)}>
        <div className={styles.status_option_container}>
          <Option checked={status === 'PUBLISHED'} onChange={onToggle} id={id} />
        </div>
      </div>
      <div className={styles.td}>
        <span className={styles.stock}>
          <span className={styles.mobile_hidden_text}>Stock:</span>
          {product?.quantity || parameters[0].quantity || 0}
        </span>
      </div>
      <div className={styles.td}>
        <span className={styles.preorder}>
          <span className={styles.mobile_hidden_text}>Pre-order:</span>
          <img src={available === 'Available' ? ChkIcon : DashIcon} alt="" />
        </span>
      </div>
    </div>
  )
}

Product.propTypes = {
  // product: T.arrayOf(T.shape) ,
  onToggle: T.func,
  pushRoute: T.func,
}

export default Product
