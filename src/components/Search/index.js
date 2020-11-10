import React, { useState } from 'react'
import SearchIcon from 'assets/icons/svg/search-icon.svg'
import T from 'prop-types'
import styles from './search.module.scss'

const Search = (props) => {
  const { onSearch } = props
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
    onSearch(String(e.target.value).toLowerCase())
  }

  return (
    <div className={styles.container}>
      <input type="text" placeholder="Search by products" onChange={onChange} value={value} />
      <img className={styles.search_icon} src={SearchIcon} alt="magnifier" />
    </div>
  )
}

Search.propTypes = {
  onSearch: T.func,
}

export default Search
