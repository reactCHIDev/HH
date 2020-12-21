/* eslint-disable no-console */
import React from 'react'
import useSortableData from 'hooks/useSortable'

import Header from './Table/Header'
import Row from './Table/Row'
import Details from '../Details'
import styles from './ordersfl.module.scss'

const orders = [
  {
    id: 113213,
    items: 2,
    amount: 343,
    delivery: 'express',
    status: 'delivered',
    date: 'Jul, 25',
    time: '10:25',
  },
  {
    id: 113322,
    items: 22,
    amount: 32,
    delivery: 'free',
    status: 'delivered',
    date: 'Jul, 30',
    time: '10:00',
  },
  {
    id: 111122,
    items: 2,
    amount: 10,
    delivery: 'free',
    status: 'delivered',
    date: 'Jul, 1',
    time: '20:00',
  },
]

const OrdersFL = () => {
  const [data, setData] = React.useState()
  const [orderIdToShow, setOrderIdToShow] = React.useState(null)

  console.log(orderIdToShow)

  const { items, requestSort } = useSortableData(orders, {
    key: 'name',
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
      {orderIdToShow ? (
        <Details />
      ) : (
        <div>
          {data ? (
            <div className={styles.container}>
              <Header requestSort={requestSort} />
              {data.map((item) => (
                <Row item={item} key={item.id} setOrderIdToShow={setOrderIdToShow} />
              ))}
              <div className={styles.pastOrders}>
                <div onClick={loadMoreHandler}>&#8634; past orders</div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}

OrdersFL.propTypes = {}

export default OrdersFL
