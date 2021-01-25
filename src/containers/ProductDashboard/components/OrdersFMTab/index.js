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
    key: 'createdAt',
    direction: 'descending',
  })

  React.useEffect(() => {
    setData(items)
  }, [items])

  React.useEffect(() => {
    if (searchValue) {
      const lowerSearchValue = searchValue.toLowerCase()
      const newState = cloneDeep(items).filter((e) =>
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

  const isDateValid = (curTime, startTime, endTime) => {
    const c = new Date(curTime).setUTCHours(0, 0, 0, 0)
    const s = new Date(startTime).setUTCHours(0, 0, 0, 0)
    const e = new Date(endTime).setUTCHours(0, 0, 0, 0)
    return s <= c && c <= e
  }

  const onDataChange = (date) => {
    const { 0: start, 1: end } = date

    if (date) {
      const newState = cloneDeep(items).filter((e) => isDateValid(e.createdAt, start, end))
      setData(newState)
    } else {
      setData(items)
    }
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
