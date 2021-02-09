import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './header.module.scss'
import './header.less'

const Header = (props) => {
  const { onSearch, mark } = props

  const extraMark = (num) => <div className={styles.extra_mark}>{num}</div>

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <p className={styles.qwe}>Listing </p>
          {extraMark(mark)}
        </div>
        <div className={styles.srch_block}>
          <Link to="/addexperience">
            ADD <span>EXPERIENCE</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  onSearch: T.func,
}

export default Header
