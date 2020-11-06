import React, { useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import ChkBox from 'components/ChkBox'
import SortElement from 'components/SortElement'
import { getProductTypes } from 'actions/listing'
import Header from '../DashboardHeader'
import CollapsedBlock from './components/CollapsedBlock'
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
  { title: 'Name', width: '40%' },
  { title: 'Rating', width: '19%' },
  { title: 'Status', width: '19%' },
  { title: 'Stock', width: '10%' },
  { title: 'Pre-order', width: '10%' },
]

const Listings = (props) => {
  const { types, getProductTypes } = props

  console.log('%c   types   ', 'color: white; background: salmon;', types)

  useEffect(() => {
    getProductTypes()
  }, [])

  const onChangeChkBox = (e) => {}

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <div className={styles.filter_block}>
          {types.map((el, i) => (
            <CollapsedBlock key={el.title} headerText={el.title} color={colors[i]}>
              <div className={styles.panel_content}>
                {el.productCategories.map((chk) => (
                  <ChkBox
                    key={chk.id}
                    id={chk.id}
                    labelText={chk.title}
                    onChange={(e) => console.log('id', e.target.checked)}
                  />
                ))}
              </div>
            </CollapsedBlock>
          ))}
        </div>
        <div className={styles.listing}>
          <div className={styles.sort_block}>
            {sorts.map((e) => (
              <div style={{ width: e.width }}>
                <SortElement title={e.title} />{' '}
              </div>
            ))}
          </div>
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </div>
  )
}

Listings.propTypes = {
  types: T.shape(),
  getProductTypes: T.func,
}

export default connect(({ listing: { types } }) => ({ types }), { getProductTypes })(Listings)
