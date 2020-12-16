/* eslint-disable react/prop-types */
import React from 'react'
import styles from './table.module.scss'
import SortingElement from './SortingElement'

const headings = [
  {
    id: 0,
    name: 'Selected Value',
    sort: 'selectedValue',
  },
  {
    id: 2,
    name: 'Quantity',
    sort: 'quantity',
  },
  {
    id: 3,
    name: 'Price',
    sort: 'price',
  },
  {
    id: 4,
    name: 'Total',
    sort: 'total',
  },
]

function TableHead({ requestSort }) {
  const [sortedColumn, setSortedColumn] = React.useState('Name')
  const [sorterOrder, setSorterOrder] = React.useState(false)

  return (
    <thead className={styles.tableHead}>
      <tr>
        <th className={styles.firstColumn}>
          <div
            className={styles.headingWrapper}
            onClick={() => {
              setSortedColumn('Name')
              setSorterOrder(!sorterOrder)
              requestSort('name')
            }}
          >
            <p>Name</p>
            <SortingElement type={sorterOrder} isSort={sortedColumn === 'Name'} />
          </div>
        </th>
        {headings.map((item) => (
          <th key={item.id}>
            <div
              className={styles.headingWrapper}
              onClick={() => {
                setSortedColumn(item.name)
                setSorterOrder(!sorterOrder)
                requestSort(item.sort)
              }}
            >
              {item.name} <SortingElement isSort={sortedColumn === item.name} type={sorterOrder} />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
