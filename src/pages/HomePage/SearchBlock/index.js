/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import cls from 'classnames'

import { searchRequestingnAc, clearSearchDataAc } from 'actions/search'
import useDebounce from 'hooks/useDebounce'
import { setItem } from 'utils/localStorage'
import ArrowDark from 'assets/icons/svg/down-arrow.svg'
import styles from './search.module.scss'

const searchData = [
  {
    type: 'Products',
    url: 'proucts_explore',
    isActive: true,
  },
  {
    type: 'Foodmakers',
    url: 'foodmakers_explore',
    isActive: true,
  },
  {
    type: 'Experiences',
    url: 'experiences_explore',
    isActive: false,
  },
]

function SearchBlock() {
  const dispatch = useDispatch()
  const searchedDataResults = useSelector((state) => state.search.data)
  const [searchType, setSearchType] = React.useState('Products')
  const [searchValue, setSearchValue] = React.useState('')
  const [searchCityValue, setSearchCityValue] = React.useState('')
  const [isSearchTypesVisible, setIsSearchTypesVisible] = React.useState(false)
  const [cityResult, setCityResults] = React.useState([])

  const clickHandler = (type) => {
    setSearchType(type)
    setIsSearchTypesVisible(false)
  }

  const debouncedSearchTerm = useDebounce(searchValue, 500)
  const debouncedCitySearch = useDebounce(searchCityValue, 500)

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(
        searchRequestingnAc({ searchType, dataForSearch: { searchedValue: debouncedSearchTerm } }),
        setItem('search_data', {
          searchTitle: debouncedSearchTerm,
        }),
      )
    } else {
      dispatch(clearSearchDataAc())
    }
  }, [debouncedSearchTerm, searchType])

  React.useEffect(() => {
    if (debouncedCitySearch) {
      // console.log(debouncedCitySearch)
    } else {
      dispatch(clearSearchDataAc())
    }
  }, [debouncedCitySearch, searchType])

  return (
    <div className={styles.search_block}>
      <div className={styles.input_wrapper}>
        <label className={styles.label}>What are you looking for? *</label>
        <div className={styles.inputs_container}>
          <div className={styles.selectWrapper}>
            <div className={styles.select} onClick={() => setIsSearchTypesVisible((v) => !v)}>
              {searchType}
              <div>
                <img
                  className={cls(styles.arrow, isSearchTypesVisible ? styles.arrow_up : '')}
                  src={ArrowDark}
                  alt="arrow"
                />
              </div>
            </div>
            {isSearchTypesVisible ? (
              <div className={styles.typesWrapper}>
                {searchData.map((item) => (
                  <div
                    onClick={() => {
                      if (searchType === item.type || !item.isActive) return
                      clickHandler(item.type)
                    }}
                    key={item.type}
                    style={
                      searchType === item.type || !item.isActive
                        ? { opacity: 1, cursor: 'default' }
                        : {}
                    }
                  >
                    {item.type}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <input
            className={styles.input}
            type="text"
            placeholder="Cakes & bakes products"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchedDataResults.length ? (
            <div className={styles.searchedData}>
              {searchedDataResults.map((item) => (
                <Link
                  key={item.id}
                  to={
                    item.title
                      ? `/product/${item.id}`
                      : `/${item.hungryHuggerLink.split('/').pop()}`
                  }
                >
                  <div>{item.title || `${item.firstName}${item.lastName}`}</div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        <span className={styles.label}>Celebration, Team Building, Family Day etc.</span>
      </div>
      <div className={styles.input_wrapper}>
        <label className={styles.label}>City *</label>
        <input
          style={{ borderRadius: '8px' }}
          className={styles.city_input}
          type="text"
          placeholder="Select a city"
          onChange={(e) => setSearchCityValue(e.target.value)}
        />
        <span className={cls(styles.label, 'mobile_hidden')}>Hong-Kong, Sydney</span>
      </div>
      <div className={styles.input_wrapper}>
        <Link to={searchType === 'Products' ? '/product_explore' : '/foodmakers_explore'}>
          <button type="button" disabled={!searchedDataResults.length}>
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11.5" cy="11.5" r="8.75" stroke="#000000" strokeWidth="1.5" />
              <path d="M18 18L22 22" stroke="#000000" strokeWidth="1.5" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default SearchBlock