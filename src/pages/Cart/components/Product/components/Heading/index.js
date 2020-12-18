import React from 'react'
import T from 'prop-types'
import styles from '../../product.module.scss'

function Heading({ title }) {
  return (
    <div className={styles.headingWrapper}>
      <div className={styles.shopName}>
        <p>{title}</p>
      </div>
      <button type="button" className={styles.shopButton}>
        VIEW SHOP
      </button>
    </div>
  )
}

Heading.propTypes = {
  title: T.string.isRequired,
}

export default Heading
