import React from 'react'
import T from 'prop-types'
import Search from 'components/Search'
import styles from './header.module.scss'

const Header = (props) => {
  const { onSearch, mark = 4 } = props

  const extraMark = (num) => <div className={styles.extra_mark}>{num}</div>

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <p className={styles.qwe}>Orders </p>
          {extraMark(mark)}
        </div>
        <div className={styles.srch_block}>
          <Search onSearch={onSearch} />
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  onSearch: T.func,
  mark: T.number,
}

export default Header
