import React from 'react'
import T from 'prop-types'
import styles from './product_page.module.scss'
import './product_page.less'

const ProductPage = (props) => {
  const { a } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>PRODUCT PAGE</div>
    </div>
  )
}

ProductPage.propTypes = {
  a: T.number.isRequired,
  b: T.string.isRequired,
  c: T.bool.isRequired,
  f: T.func.isRequired,
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
      content: T.node,
    }).isRequired,
  }).isRequired,
}

export default ProductPage
