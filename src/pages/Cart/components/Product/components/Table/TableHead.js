/* eslint-disable react/prop-types */
import React from 'react'
import cls from 'classnames'
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
    <div className={styles.tableHead}>
      <div className={styles.firstColumn}>
        <div className={styles.nameWrapper}>
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

          <div
            className={cls(styles.headingWrapper, styles.quantity)}
            onClick={() => {
              setSortedColumn('Selected value')
              setSorterOrder(!sorterOrder)
              requestSort('selectedValue')
            }}
          >
            Selected value{' '}
            <SortingElement isSort={sortedColumn === 'Selected value'} type={sorterOrder} />
          </div>
        </div>
        <div
          className={cls(styles.headingWrapper, styles.quantity)}
          onClick={() => {
            setSortedColumn('Quantity')
            setSorterOrder(!sorterOrder)
            requestSort('quantity')
          }}
        >
          Quantity <SortingElement isSort={sortedColumn === 'Quantity'} type={sorterOrder} />
        </div>
      </div>
      <div className={styles.priceWrapper}>
        <div
          className={cls(styles.headingWrapper, styles.price)}
          onClick={() => {
            setSortedColumn('Price')
            setSorterOrder(!sorterOrder)
            requestSort('price')
          }}
        >
          Price <SortingElement isSort={sortedColumn === 'Price'} type={sorterOrder} />
        </div>

        <div
          className={cls(styles.headingWrapper, styles.total)}
          onClick={() => {
            setSortedColumn('Total')
            setSorterOrder(!sorterOrder)
            requestSort('total')
          }}
        >
          'Total' <SortingElement isSort={sortedColumn === 'Total'} type={sorterOrder} />
        </div>
      </div>
      <div className={cls(styles.headingWrapper, styles.placeholder)} />
    </div>
  )
}

export default TableHead
