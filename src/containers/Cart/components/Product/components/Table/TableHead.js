/* eslint-disable react/prop-types */
import React from 'react'
import cls from 'classnames'
import styles from './table.module.scss'
import SortingElement from './SortingElement'

function TableHead({ requestSort }) {
  const [sortedColumn, setSortedColumn] = React.useState('title')
  const [sorterOrder, setSorterOrder] = React.useState(false)

  return (
    <div className={styles.tableHead}>
      <div className={styles.firstColumn}>
        <div className={styles.nameWrapper}>
          <div
            className={styles.headingWrapper}
            onClick={() => {
              setSortedColumn('title')
              setSorterOrder(!sorterOrder)
              requestSort('title')
            }}
          >
            <p>Name</p>
            <SortingElement type={sorterOrder} isSort={sortedColumn === 'title'} />
          </div>

          <div
            className={cls(styles.headingWrapper, styles.quantity)}
            onClick={() => {
              setSortedColumn('Selected value')
              setSorterOrder(!sorterOrder)
              requestSort('parameters[0].value')
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
            requestSort('total')
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
            requestSort('totalPrice')
          }}
        >
          Total <SortingElement isSort={sortedColumn === 'Total'} type={sorterOrder} />
        </div>
      </div>
      <div className={cls(styles.headingWrapper, styles.placeholder)} />
    </div>
  )
}

export default TableHead
