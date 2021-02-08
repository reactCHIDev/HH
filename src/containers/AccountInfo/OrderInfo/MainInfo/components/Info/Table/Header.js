import React from 'react'
import styles from './table.module.scss'
import SortingElement from './SortingElement'

const headers = [
  {
    title: 'Qty',
    sortType: 'quantity',
    style: 'qty',
  },
  {
    title: 'Price',
    sortType: 'price',
    style: 'price',
  },
  {
    title: 'Total',
    sortType: 'totalAmount',
    style: 'total',
  },
]

function Header({ requestSort }) {
  const [sortedColumn, setSortedColumn] = React.useState('quantity')
  const [sorterOrder, setSorterOrder] = React.useState(false)
  return (
    <div className={styles.headerWrapper}>
      <div style={{ width: '70%' }} />
      <>
        {headers.map((item) => (
          <>
            <div
              className={styles[item.style]}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setSortedColumn(item.sortType)
                setSorterOrder(!sorterOrder)
                requestSort(item.sortType)
              }}
            >
              {item.title}
              <SortingElement type={sorterOrder} isSort={sortedColumn === item.sortType} />
            </div>
          </>
        ))}
      </>
    </div>
  )
}

export default Header
