/* eslint-disable react/prop-types */
import React from 'react'
import Header from './Header'
import Row from './Row'
import styles from './table.module.scss'
import useSortableData from 'hooks/useSortable'

function Table({ orderInfo }) {
  const data = orderInfo.map(({ totalAmount, ...rest }) => ({
    totalAmount: rest.quantity * rest.price,
    ...rest,
  }))

  const { items, requestSort } = useSortableData(data, {
    key: 'quantity',
    direction: 'descending',
  })

  return (
    <div className={styles.table_container}>
      <Header requestSort={requestSort} />
      {items && items.map((item) => <Row item={item} key={item.id} />)}
    </div>
  )
}

export default Table
