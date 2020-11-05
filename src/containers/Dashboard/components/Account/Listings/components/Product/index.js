import React from 'react'
import T from 'prop-types'
import EditIcon from 'assets/icons/svg/editor-icon.svg'
import ProdPhoto from 'assets/images/landings/create_experience/sec24.jpg'
import { Rate } from 'antd'
import Option from '../Option'
import styles from './product.module.scss'
import './product.less'

const Product = (props) => {
  const { x } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image_container}>
          <img src={ProdPhoto} alt="product" />
        </div>
        <p className={styles.product_name}>Pie with carrots and apple</p>
        <div className={styles.edit_btn_container}>
          <img className={styles.edit_btn_img} src={EditIcon} alt="edit" />
        </div>
        <div className={styles.rating_container}>
          <Rate style={{ color: '#3C3E43' }} />
        </div>
        <div className={styles.status_option_container}>
          <Option />
        </div>
        <p className={styles.stock}>321</p>
        <p className={styles.preorder}>-</p>
      </div>
    </div>
  )
}

Product.propTypes = {}

export default Product
