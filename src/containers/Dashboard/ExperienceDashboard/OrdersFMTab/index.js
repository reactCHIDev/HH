import React from 'react'
import T from 'prop-types'
import styles from './maininfo.module.scss'
import Header from './Header'
import Table from './Table'

const orders = [
  {
    id: 113213,
    items: 2,
    amount: 343,
    delivery: 'express',
    status: 'delivered',
    date: 'Jul, 25',
    time: '10:25',
    clientName: 'Sasha',
  },
  {
    id: 113322,
    items: 22,
    amount: 32,
    delivery: 'standart',
    status: 'delivered',
    date: 'Jul, 30',
    time: '10:00',
    clientName: 'Sasha',
  },
  {
    id: 111122,
    items: 2,
    amount: 10,
    delivery: 'free',
    status: 'delivered',
    date: 'Jul, 1',
    time: '20:00',
    clientName: 'Sasha',
  },
]

const MainOrderInfo = (props) => {
  const { orderHash } = props
  const [smth, setSmth] = React.useState('')

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header onSearch={setSmth} />
        <Table orders={orders} />
      </div>
    </div>
  )
}

MainOrderInfo.propTypes = {
  orderHash: T.string,
}

export default MainOrderInfo
