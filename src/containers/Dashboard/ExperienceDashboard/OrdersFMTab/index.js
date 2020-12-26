import React from 'react'
import { useSelector } from 'react-redux'

import Header from './Header'
import Table from './Table'

import styles from './maininfo.module.scss'

const MainOrderInfo = () => {
  const orders = useSelector((state) => state.fmOrders.orders)
  const [searchValue, setSearchValue] = React.useState('')

  const onDataChange = (date) => {
    console.log('%c   date   ', 'color: darkgreen; background: palegreen;', date)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header onSearch={setSearchValue} onDataChange={onDataChange} mark={orders.length} />
        <div className={styles.table_scroller}>
          <Table orders={orders} searchValue={searchValue} />
        </div>
      </div>
    </div>
  )
}

export default MainOrderInfo
