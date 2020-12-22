/* eslint-disable react/prop-types */
import React from 'react'
import useSortableData from 'hooks/useSortable'

import Header from './Header'
import Row from './Row'

function Table({ orders }) {
  const [data, setData] = React.useState()

  const { items, requestSort } = useSortableData(orders, {
    key: 'name',
    direction: 'ascending',
  })

  React.useEffect(() => {
    setData(items)
  }, [items])

  return (
    <div>
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
