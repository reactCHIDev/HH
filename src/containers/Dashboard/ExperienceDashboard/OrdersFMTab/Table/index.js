/* eslint-disable react/prop-types */
import React from 'react'
import useSortableData from 'hooks/useSortable'
import cloneDeep from 'lodash/cloneDeep'

import Header from './Header'
import Row from './Row'

function Table({ orders, smth }) {
  const [data, setData] = React.useState()

  const { items, requestSort } = useSortableData(orders, {
    key: 'time',
    direction: 'ascending',
  })

  React.useEffect(() => {
    setData(items)
  }, [items])

  React.useEffect(() => {
    if (smth) {
      const lsmth = smth.toLowerCase()
      const newState = cloneDeep(data).filter(
        (p) => p.client.toLowerCase().includes(lsmth) || p.status.toLowerCase().includes(lsmth),
      )
      setData(newState)
    } else {
      setData(items)
    }
  }, [smth])

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
