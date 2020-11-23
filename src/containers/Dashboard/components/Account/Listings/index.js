import React, { useState, useEffect } from 'react'
import T, { shape, string } from 'prop-types'
import { connect } from 'react-redux'
import ChkBox from 'components/ChkBox'
import { Pagination } from 'antd'
import SortElement from 'components/SortElement'
import { getProductTypes, getMyProductList } from 'actions/listing'
import Header from './components/ListingHeader'
import CollapsedBlock from './components/CollapsedBlock'
import Product from './components/Product'
import styles from './listing.module.scss'
import './listing.less'
import { map } from 'lodash'

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
  const { types, myProducts = [], getProductTypes, getMyProductList } = props

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState(types)
  const [productTypes, setProductTypes] = useState([])
  const [ids, setIds] = useState([])
  const [sort, setSort] = useState(sorts)
  const [filteredProducts, filterProducts] = useState(myProducts)
  const [searchSubstring, setSearchSubstring] = useState('')
  const [productsToShow, setProductsToShow] = useState(myProducts)

  const pageSize = 3

  console.log('productTypes', productTypes)
  console.log('filters', filters)

  const resetFilters = () => {
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
  }, [])

  useEffect(() => {
    setProductTypes(
      types.map((e1) => ({
        ...e1,
        productCategories: [...e1.productCategories].map((e3) => ({ ...e3 })),
      })),
    )
  }, [types])

  useEffect(() => {
    filterProducts(myProducts)
  }, [myProducts])

  useEffect(() => {
    filterProducts(
      myProducts
        .filter((p) => ids.includes(String(p.productCategoryId)))
        .filter((p) => p.title.toLowerCase().includes(searchSubstring)),
    )
  }, [filters])

  useEffect(() => {
    setTotal(filteredProducts.length)
    setPage(1)
  }, [filteredProducts])

  useEffect(() => {
    if (productTypes.length > 0) {
      console.log('reset')
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
      if (
        tmp[index].type === 'desc' &&
        String(a[keyForSort[clickedSort]]).toLowerCase() <
          String(b[keyForSort[clickedSort]]).toLowerCase()
      )
        return 1
      if (
        tmp[index].type === 'asc' &&
        String(a[keyForSort[clickedSort]]).toLowerCase() >=
          String(b[keyForSort[clickedSort]]).toLowerCase()
      )
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

    const tmp = [...myProducts]
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

  return (
    <div className={styles.container}>
      <Header onSearch={onSearch} />
      <div className={styles.main}>
        <div className={styles.filter_block}>
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
        {filteredProducts.length > 0 && (
          <div className={styles.listing}>
            <div className={styles.product_table}>
              <div className={styles.tr}>
                {sorts.map((e, i) => (
                  <div className={styles.th} key={e.id + String(i)}>
                    <SortElement title={e.title} type={e.type} onClick={onSort} />{' '}
                  </div>
                ))}
              </div>
            
              {filteredProducts
                .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
                .map((product) => (
                  <Product key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              defaultCurrent={page}
              defaultPageSize={pageSize}
              current={page}
              onChange={setPage}
              onShowSizeChange={null}
              pageSizeOptions={null}
              total={total}
            />
          </div>
        )}
      </div>
    </div>
  )
}

Listings.propTypes = {
  types: T.arrayOf(shape()),
  myProducts: T.arrayOf(shape()),
  getProductTypes: T.func,
  getMyProductList: T.func,
}

export default connect(({ listing: { types, myProducts } }) => ({ types, myProducts }), {
  getProductTypes,
  getMyProductList,
})(Listings)
