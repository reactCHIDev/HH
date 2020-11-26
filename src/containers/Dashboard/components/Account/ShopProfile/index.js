import React from 'react'
import T from 'prop-types'
import styles from './shopprofile.module.scss'
import './shopprofile.less'

const ShopProfile = (props) => {
  const { x } = props

  return (
    <div className={styles.container}>
      <div className={styles.content} />
    </div>
  )
}

ShopProfile.propTypes = {}

export default ShopProfile
