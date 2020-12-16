/* eslint-disable react/prop-types */
import React from 'react'

import styles from './table.module.scss'

import TableRow from './TableRow'
import TableHead from './TableHead'

function Table({ data, setData, requestSort }) {
  const handler = (id, isPlus) => {
    const newData = data.map((item) => {
      if (item.id == id) {
        return { ...item, quantity: isPlus ? item.quantity + 1 : item.quantity - 1 }
      }
      return item
    })

    setData(newData)
  }

  return data ? (
    <div>
      <table className={styles.tableWrapper}>
        <TableHead requestSort={requestSort} />
        <tbody>
          {data.map((item) => (
            <TableRow key={item.id} item={item} handler={handler} />
          ))}
        </tbody>
      </table>
    </div>
  ) : null
}

export default Table
