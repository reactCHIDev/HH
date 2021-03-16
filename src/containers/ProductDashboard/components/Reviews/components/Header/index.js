/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import T from 'prop-types'
import styles from './header.module.scss'

const Header = (props) => {
  const { mark = '' } = props

  const extraMark = (num) => <div className={styles.extra_mark}>{num}</div>

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <p className={styles.qwe}>Reviews </p>
          {extraMark(mark)}
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  onSearch: T.func,
  onDataChange: T.func,
  mark: T.number,
}

export default Header
