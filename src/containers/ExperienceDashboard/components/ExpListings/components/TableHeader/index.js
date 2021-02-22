/* eslint-disable react/prop-types */
import React from 'react'
import cls from 'classnames'
import SortingElement from '../SortingElement'
import styles from './tableHeader.module.scss'

const headers = [
  { title: 'Name', sortType: 'title', clsName: 'name' },
  { title: 'Status', sortType: 'status', clsName: 'status' },
  { title: 'Last Modified', sortType: 'createdAt', clsName: 'date' },
]

function TableHeader({ requestSort }) {
  const [sortedColumn, setSortedColumn] = React.useState('title')
  const [sorterOrder, setSorterOrder] = React.useState(false)

  const clickHandler = (type) => {
    setSortedColumn(type)
    setSorterOrder(!sorterOrder)
    requestSort(type)
  }

  return (
    <div className={styles.container}>
      {headers.map((el) => (
        <div
          key={el.title}
          className={cls(styles.heading, styles[el.clsName])}
          onClick={() => clickHandler(el.sortType)}
        >
          <div>{el.title}</div>
          <SortingElement type={sorterOrder} isSort={sortedColumn === el.sortType} />
        </div>
      ))}
    </div>
  )
}

export default TableHeader
