/* eslint-disable react/prop-types */
import React from 'react'

import styles from './table.module.scss'
import TableRow from './TableRow'
import TableHead from './TableHead'

function Table({ data, requestSort }) {
  return data ? (
    <div className={styles.tableWrapper}>
      <TableHead requestSort={requestSort} />
      {data.map((item) => (
        <TableRow key={item.id} item={item} />
      ))}
    </div>
  ) : null
}

export default Table
