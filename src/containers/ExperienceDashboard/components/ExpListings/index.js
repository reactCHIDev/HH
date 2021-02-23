/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSortableData from 'hooks/useSortable'
import { getMyExperiencesList } from 'actions/experience-listing'

import T, { element, shape } from 'prop-types'
import Modal from 'components/UniversalModal'
import Header from './components/ListingHeader'
import TableHeader from './components/TableHeader'
import ProductRaw from './components/ProductRaw'
import styles from './listing.module.scss'
import './listing.less'

const ExpListings = (props) => {
  const dispatch = useDispatch()
  const experiences = useSelector((state) => state.expListing.myExperiences)
  const counter = useSelector((state) => state.expListing.counter)

  const [data, setData] = React.useState()
  const { items, requestSort } = useSortableData(experiences, {
    key: 'product',
    direction: 'descending',
  })

  React.useEffect(() => {
    dispatch(getMyExperiencesList())
  }, [])

  React.useEffect(() => {
    setData(items)
  }, [items])

  return (
    <div className={styles.container}>
      <Header onSearch={() => {}} mark={counter || ''} />
      {data && data.length ? (
        <>
          <TableHeader requestSort={requestSort} />
          {data.map((el) => (
            <ProductRaw key={el.id} element={el} />
          ))}
        </>
      ) : null}
    </div>
  )
}

ExpListings.propTypes = {}

ExpListings.defaultProps = {}

export default ExpListings
