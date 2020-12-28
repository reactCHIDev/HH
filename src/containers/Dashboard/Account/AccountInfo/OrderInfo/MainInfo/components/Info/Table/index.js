/* eslint-disable react/prop-types */
import React from 'react'
import Header from './Header'
import Row from './Row'
import styles from './table.module.scss'

function Table({ orderInfo }) {
  return (
    <div className={styles.table_container}>
      <Header />
      {orderInfo.map((item) => (
        <Row item={item} key={item.id} />
      ))}
    </div>
  )
}

export default Table
