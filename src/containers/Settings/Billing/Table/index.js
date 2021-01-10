/* eslint-disable react/prop-types */
import React from 'react'
import useSortableData from 'hooks/useSortable'

import Header from './Header'
import Row from './Row'

import styles from './table_wrapper.module.scss'

function Table({ billings }) {
  const [data, setData] = React.useState()

  const { items, requestSort } = useSortableData(billings, {
    key: 'date',
    direction: 'ascending',
  })

  React.useEffect(() => {
    setData(items)
  }, [items])

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
