import React from 'react'
import T from 'prop-types'
import Search from 'components/Search'
import { DatePicker } from 'antd'
import styles from './header.module.scss'

const Header = (props) => {
  const { onSearch, onDataChange, mark = '' } = props

  const extraMark = (num) => <div className={styles.extra_mark}>{num}</div>

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <p className={styles.qwe}>Reviews </p>
          {extraMark(mark)}
        </div>
        <div className={styles.tools}>
          <div className={styles.date_picker}>
            <DatePicker disabled={false} id="1" format="DD MMM YY" onChange={onDataChange} />
          </div>
          <div className={styles.srch_block}>
            <Search onSearch={onSearch} placeholder="Search by experiences" />
          </div>
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
