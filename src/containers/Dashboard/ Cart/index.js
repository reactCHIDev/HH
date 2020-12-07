import React from 'react'
// import T from 'prop-types'
import SortElement from 'components/SortElement'
import cls from 'classnames'
import styles from './cart.module.scss'
import './cart.less'

const sorts = [
  { title: 'Name', type: 'desc', width: '10%', id: 1 },
  { title: 'Selected value', type: 'nosort', width: '19%', id: 2 },
  { title: 'Quantity', type: 'nosort', width: '19%', id: 3 },
  { title: 'Price', type: 'nosort', width: '10%', id: 4 },
  { title: 'Total', type: 'nosort', width: '10%', id: 5 },
]

const Cart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sort_block}>
        {sorts.map((e, i) => (
          <div className={styles.th} key={e.id + String(i)}>
            <SortElement title={e.title} type={e.type} onClick={() => {}} />
          </div>
        ))}
      </div>
    </div>
  )
}

// Cart.propTypes = {}

export default Cart
