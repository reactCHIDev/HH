import React, { useState, useEffect } from 'react'
import T, { shape } from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import cloneDeep from 'lodash/cloneDeep'
import { Spin, Space } from 'antd'
import ChkBox from 'components/ChkBox'
import CollapsedBlock from 'components/CollapsedBlock'
import cls from 'classnames'
import SortElement from 'components/SortElement'
import Modal from 'components/UniversalModal'
import { toggleProductStatusRequestAC } from 'actions/product'
import { getMyProductList } from 'actions/listing'
import { getProductTypes } from 'actions/system'
import Header from './components/ListingHeader'
import EditProduct from './components/EditProduct'
import Product from './components/Product'
import styles from './listing.module.scss'
import './listing.less'

const colors = [
  '#fff3f3',
  '#fff7ef',
  '#fdfeee',
  '#eeefff',
  '#fff3f3',
  '#fff7ef',
  '#fdfeee',
  '#eeefff',
]

const sorts = [
  { title: 'Name', type: 'desc', width: '10%', id: 1 },
  { title: 'Rating', type: 'desc', width: '19%', id: 2 },
  { title: 'Status', type: 'desc', width: '19%', id: 3 },
  { title: 'Stock', type: 'desc', width: '10%', id: 4 },
  { title: 'Pre-order', type: 'desc', width: '10%', id: 5 },
]

const Listings = (props) => {
  const {
    types,
    myProducts,
    userProfile,
    requesting,
    getProductTypes,
    getMyProductList,
    toggleProductStatusRequestAC,
    pushRoute,
  } = props

  const [filters, setFilters] = useState(types)
  const [productTypes, setProductTypes] = useState([])
  const [ids, setIds] = useState([])
  const [sort, setSort] = useState(sorts)
  const [filteredProducts, filterProducts] = useState([])
  const [searchSubstring, setSearchSubstring] = useState('')
  const [menu, setMenu] = useState(false)

  const resetFilters = () => {
    setIds([])
    setFilters(
      productTypes.map((type) => {
        type.productCategories = type.productCategories.map((category) => {
          category.checked = false
          return category
        })

        return type
      }),
    )
  }

  useEffect(() => {
    getProductTypes()
    getMyProductList()
  }, [])

  useEffect(() => {
    setProductTypes(cloneDeep(types))
  }, [types])

  useEffect(() => {
    filterProducts(cloneDeep(myProducts))
  }, [myProducts])

  useEffect(() => {
    filterProducts(
      cloneDeep(myProducts)
        .filter((p) => (ids.length ? ids.includes(String(p.productCategoryId)) : true))
        .filter((p) => p.title.toLowerCase().includes(searchSubstring)),
    )
  }, [filters])

  useEffect(() => {
    if (productTypes.length > 0) {
      // getMyProductList()
      resetFilters()
    }
  }, [productTypes])

  const onChangeChkBox = (e) => {
    const { id, checked } = e.currentTarget
    if (checked && !ids.includes(id)) setIds(ids.concat([id]))
    if (!checked && ids.includes(id)) setIds(ids.filter((el) => el !== id))
    setFilters(
      filters.map((type) => {
        type.productCategories = type.productCategories.map((category) => {
          if (category.id === Number(id)) {
            category.checked = checked
          }
          return category
        })
        return type
      }),
    )
  }

  const onSort = (e) => {
    const clickedSort = e.currentTarget.title
    const keyForSort = { Name: 'title', Rating: 'rating', Status: 'status', Stock: 'quantity' }
    const tmp = [...sort]
    const index = tmp.findIndex((el) => el.title === clickedSort)
    if (tmp[index].type === 'asc') {
      tmp[index].type = 'desc'
    } else {
      tmp[index].type = 'asc'
    }

    const filtered = filteredProducts.sort((a, b) => {
      if (tmp[index].type === 'desc' && a[keyForSort[clickedSort]] < b[keyForSort[clickedSort]])
        return 1
      if (tmp[index].type === 'asc' && a[keyForSort[clickedSort]] >= b[keyForSort[clickedSort]])
        return 1
      return -1
    })

    setSort(tmp)
    filterProducts(filtered)
  }

  const onSearch = (value) => {
    if (value === '') {
      resetFilters()
      setIds([])
      setSearchSubstring('')
      return
    }

    const tmp = cloneDeep(myProducts)
    setFilters(
      productTypes.map((type) => {
        type.productCategories = type.productCategories.map((category) => {
          if (
            tmp
              .filter((p) => p.title.toLowerCase().includes(value))
              .map((el) => String(el.productCategoryId))
              .includes(String(category.id))
          ) {
            category.checked = true
          } else {
            category.checked = false
          }
          return category
        })
        return type
      }),
    )
    setIds(
      tmp
        .filter((p) => p.title.toLowerCase().includes(value))
        .map((el) => String(el.productCategoryId)),
    )
    setSearchSubstring(String(value).toLowerCase())
  }

  const test = (data) => {
    toggleProductStatusRequestAC(data)
  }

  return (
    <div className={styles.container}>
      <Header onSearch={onSearch} mark={filteredProducts?.length} />
      <div className={cls(styles.main, menu ? styles.filter_active : ' ')}>
        <div className={styles.filter_item_list}>
          <div>
            <a href="#" onClick={() => setMenu(!menu)} className={styles.filter_btn}>
              Filter
            </a>
            <span className={styles.categories}>
              Categories: <span className={styles.categories_item}>{`${ids.length} selected`}</span>
            </span>
          </div>
          <a href="#" onClick={resetFilters}>
            Clear
          </a>
        </div>
        <div className={styles.filter_block}>
          <a href="#" onClick={() => setMenu(!menu)} className={styles.filter_btn}>
            <img src="https://www.flaticon.com/svg/static/icons/svg/860/860796.svg" alt="icon" />
          </a>
          {filters.length &&
            filters.map((el, i) => (
              <CollapsedBlock key={el.title} headerText={el.title} color={colors[i]}>
                <div className={styles.panel_content}>
                  {el.productCategories.map((chk) => (
                    <ChkBox
                      key={chk.id}
                      id={chk.id}
                      labelText={chk.title}
                      checked={chk.checked}
                      onChange={onChangeChkBox}
                    />
                  ))}
                </div>
              </CollapsedBlock>
            ))}
        </div>
        {filteredProducts ? (
          <div className={styles.listing}>
            <div className={styles.product_table}>
              <div className={styles.tr}>
                {sorts.map((e, i) => (
                  <div className={styles.th} key={e.id + String(i)}>
                    <SortElement title={e.title} type={e.type} onClick={onSort} />{' '}
                  </div>
                ))}
              </div>

              {filteredProducts.map((product) => (
                <Product key={product.id} pushRoute={pushRoute} product={product} onToggle={test} />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
            <Space size="middle">
              <Spin size="large" />
            </Space>
          </div>
        )}
      </div>
    </div>
  )
}

Listings.propTypes = {
  types: T.arrayOf(shape()),
  myProducts: T.arrayOf(shape()),
  userProfile: T.shape(),
  requesting: T.bool,
  getProductTypes: T.func,
  getMyProductList: T.func,
  toggleProductStatusRequestAC: T.func,
  pushRoute: T.func,
}

Listings.defaultProps = {
  types: [],
  myProducts: [],
}

export default connect(
  ({
    listing: {
      myProducts: { products: myProducts, userProfile },
      requesting,
    },
    system: { productTypes: types },
  }) => ({ types, myProducts, userProfile, requesting }),
  {
    getProductTypes,
    getMyProductList,
    toggleProductStatusRequestAC,
    pushRoute: push,
  },
)(Listings)
