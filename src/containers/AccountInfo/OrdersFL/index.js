/* eslint-disable no-console */
import React, { useEffect } from 'react'
import useSortableData from 'hooks/useSortable'
import { useDispatch, useSelector } from 'react-redux'
import { getFoodloverOrdersAC } from 'actions/foodlover-orders'

import Header from './Table/Header'
import Row from './Table/Row'
import styles from './ordersfl.module.scss'

const OrdersFL = () => {
  const orders = useSelector((state) => state.flOrders.orders)
  const [data, setData] = React.useState()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFoodloverOrdersAC())
  }, [])

  const { items, requestSort } = useSortableData(orders, {
    key: 'time',
    direction: 'ascending',
  })

  React.useEffect(() => {
    setData(items)
  }, [items])

  const loadMoreHandler = () => {
    console.log('load more')
  }

  return (
    <>
      <div className={styles.main_wrapper}>
        <div className={styles.container}>
          {data ? (
            <div className={styles.table_wrapper}>
              <Header requestSort={requestSort} />
              {data.map((item) => (
                <Row item={item} key={item.id} />
              ))}
              <div className={styles.pastOrders}>
                <div onClick={loadMoreHandler}>&#8634; past orders</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

OrdersFL.propTypes = {}

export default OrdersFL
