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
import cls from "classnames"

const Product = ({ product }) => {
  const { coverPhoto, title, rating, status, quantity, available } = product

  return (
    <div className={styles.tr}>
      <div className={styles.td}>
        <div className={styles.description}>
          <div className={styles.description_content}>
            <div className={styles.image_container}>
              <img  
                src={
                  /* coverPhoto */
                  'https://eda.ru/img/eda/c380x380i/s1.eda.ru/StaticContent/Photos/120131082242/170418161009/p_O.jpg'
                }
                alt="product"
              />
            </div>
            <div className={styles.product_option}>
              <span className={styles.product_name}>{title}</span>
              <div className={styles.status_option_container}>
                <Option checked={status === 'PUBLISHED'} />
              </div>
            </div>
            
          </div>
          
          <div className={styles.edit_btn_container}>
            <img className={styles.edit_btn_img} src={EditIcon} alt="edit" />
          </div>
        </div>
      </div>
      <div className={styles.td}>
        <div className={cls(styles.rating_container,"rating")}>
          <Rate style={{ color: '#3C3E43' }} disabled defaultValue={rating} />
        </div>
      </div>     
      <div className={styles.td}>
        <div className={styles.status_option_container}>
        <Option checked={status === 'PUBLISHED'} />
      </div>
      </div>
      <div className={styles.td}>
        <span className={styles.stock}>{quantity}</span>
      </div>
      <div className={styles.td}>
        <span className={styles.preorder}>
          <img src={available === 'Available' ? ChkIcon : DashIcon} alt="" />
        </span>
      </div>
    </div>
  )
}

Product.propTypes = {}

export default Product
