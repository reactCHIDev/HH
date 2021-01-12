import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFoodmakerOrdersAC } from 'actions/foodmaker-orders'
import useSortableData from 'hooks/useSortable'
import cloneDeep from 'lodash/cloneDeep'

import Header from './Header'
import Table from './Table'

import styles from './maininfo.module.scss'

const MainOrderInfo = () => {
  const orders = useSelector((state) => state.fmOrders.orders)
  const [searchValue, setSearchValue] = React.useState('')
  const dispatch = useDispatch()

  const [data, setData] = React.useState()

  useEffect(() => {
    dispatch(getFoodmakerOrdersAC())
  }, [])

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

  const onDataChange = (date) => {
    console.log('%c   date   ', 'color: darkgreen; background: palegreen;', date)
  }

  return (
    <div className={styles.container}>
      {data ? (
        <div className={styles.content}>
          <Header onSearch={setSearchValue} onDataChange={onDataChange} mark={orders.length} />
          <div className={styles.table_scroller}>
            <Table data={data} requestSort={requestSort} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MainOrderInfo
