/* eslint-disable react/prop-types */
import React from 'react'

import styles from './header.module.scss'
import SortingElement from '../SortingElement'

const headers = [
  {
    title: 'Date',
    sortType: 'createdAt',
    id: 0,
  },

  {
    title: 'Amount',
    sortType: 'amount',
    id: 3,
  },
  {
    title: 'Method',
    sortType: 'brand',
    id: 4,
  },
  {
    title: 'Status',
    sortType: 'status',
    id: 5,
  },
]

function TableHeader({ requestSort }) {
  const [sortedColumn, setSortedColumn] = React.useState('time')
  const [sorterOrder, setSorterOrder] = React.useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.headingsWrapper}>
        {headers.map((item) => (
          <div className={styles[item.sortType]} key={item.id}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSortedColumn(item.sortType)
                setSorterOrder(!sorterOrder)
                requestSort(item.sortType)
              }}
            >
              <div>{item.title}</div>
              <SortingElement type={sorterOrder} isSort={sortedColumn === item.sortType} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.lastSection} />
    </div>
  )
}

export default TableHeader
