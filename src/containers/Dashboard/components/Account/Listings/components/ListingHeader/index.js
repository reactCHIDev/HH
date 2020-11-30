import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import Search from 'components/Search'
import Button from 'components/Button'
import styles from './header.module.scss'
import './header.less'

const Header = (props) => {
  const { onSearch } = props

  const extraMark = (num) => <div className={styles.extra_mark}>{num}</div>

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <p className={styles.qwe}>Listing </p>
          {extraMark(4)}
        </div>
        <div className={styles.srch_block}>
          <Search onSearch={onSearch} />
          <Link to="/addproduct">
            {/* <Button title="ADD PRODUCT" /> */}
            ADD <span>PRODUCT</span>
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
