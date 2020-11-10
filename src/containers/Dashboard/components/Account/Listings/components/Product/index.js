import React from 'react'
import T from 'prop-types'
import EditIcon from 'assets/icons/svg/editor-icon.svg'
import ChkIcon from 'assets/icons/svg/chk-icon.svg'
import DashIcon from 'assets/icons/svg/dash-icon.svg'
import ProdPhoto from 'assets/images/landings/create_experience/sec24.jpg'
import { Rate } from 'antd'
import Option from '../Option'
import styles from './product.module.scss'
import './product.less'

const Product = ({ product }) => {
  const { coverPhoto, title, rating, status, quantity, available } = product

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image_container}>
          <img
            src={
              /* coverPhoto */
              'https://eda.ru/img/eda/c380x380i/s1.eda.ru/StaticContent/Photos/120131082242/170418161009/p_O.jpg'
            }
            alt="product"
          />
        </div>
        <p className={styles.product_name}>{title}</p>
        <div className={styles.edit_btn_container}>
          <img className={styles.edit_btn_img} src={EditIcon} alt="edit" />
        </div>
        <div className={styles.rating_container}>
          <Rate style={{ color: '#3C3E43' }} disabled defaultValue={rating} />
        </div>
        <div className={styles.status_option_container}>
          <Option checked={status === 'PUBLISHED'} />
        </div>
        <p className={styles.stock}>{quantity}</p>
        <p className={styles.preorder}>
          <img src={available === 'Available' ? ChkIcon : DashIcon} alt="" />
        </p>
      </div>
    </div>
  )
}

Product.propTypes = {}

export default Product
