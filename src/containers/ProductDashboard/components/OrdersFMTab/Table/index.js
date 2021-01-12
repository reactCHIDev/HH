/* eslint-disable react/prop-types */
import React from 'react'

import Header from './Header'
import Row from './Row'

import styles from './table_wrapper.module.scss'

function Table({ data, requestSort }) {
  return (
    <div className={styles.table_wrapper}>
      {data ? (
        <>
          <Header requestSort={requestSort} />
          {data.map((item) => (
            <Row item={item} key={item.id} />
          ))}
        </>
      ) : null}
    </div>
  )
}

export default Table
