/* eslint-disable react/prop-types */
import React from 'react'

import styles from './tableHeader.module.scss'
import SortingElement from '../SortingElement'

const headers = [
  {
    title: 'Experience name',
    sortType: 'title',
    style: 'product',
    id: 0,
  },
  {
    title: 'Day',
    sortType: 'time',
    style: 'day',
    id: 1,
  },
  {
    title: 'Time',
    // sortType: 'time',
    style: 'time',
    id: 2,
  },
  {
    title: 'Price',
    sortType: 'price',
    style: 'price',
    id: 3,
  },
  {
    title: 'Participants',
    sortType: 'guests',
    style: 'participants',
    id: 4,
  },
]

function TableHeader({ requestSort }) {
  const [sortedColumn, setSortedColumn] = React.useState('product')
  const [sorterOrder, setSorterOrder] = React.useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.headingsWrapper}>
        {headers.map((item) => (
          <div className={styles[item.style || item.sortType]} key={item.id}>
            <div
              className={styles.heading}
              onClick={() => {
                setSortedColumn(item.sortType)
                setSorterOrder(!sorterOrder)
                requestSort(item.sortType)
              }}
            >
              <div>{item.title}</div>
              {item.sortType && (
                <SortingElement type={sorterOrder} isSort={sortedColumn === item.sortType} />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.lastSection} />
    </div>
  )
}

export default TableHeader
