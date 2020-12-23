import React from 'react'
import { useSelector } from 'react-redux'

import Header from './Header'
import Table from './Table'

import styles from './maininfo.module.scss'

const MainOrderInfo = () => {
  const orders = useSelector((state) => state.fmOrders.orders)
  const [searchValue, setSearchValue] = React.useState('')

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header onSearch={setSearchValue} />
        <Table orders={orders} searchValue={searchValue} />
      </div>
    </div>
  )
}

export default MainOrderInfo
