/* eslint-disable react/prop-types */
import React from 'react'
import useSortableData from 'hooks/useSortable'
import cloneDeep from 'lodash/cloneDeep'

import Header from './Header'
import Row from './Row'

import styles from './table_wrapper.module.scss'

function Table({ orders, searchValue }) {
  const [data, setData] = React.useState()

  const { items, requestSort } = useSortableData(orders, {
    key: 'time',
    direction: 'ascending',
  })

  React.useEffect(() => {
    setData(items)
  }, [items])

  React.useEffect(() => {
    if (searchValue) {
      const lowerSearchValue = searchValue.toLowerCase()
      const newState = cloneDeep(data).filter((e) =>
        Object.keys(e).some((n) =>
          String(e[n])
            .toLowerCase()
            .includes(lowerSearchValue),
        ),
      )
      setData(newState)
    } else {
      setData(items)
    }
  }, [searchValue])

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
