/* eslint-disable react/prop-types */
import React from 'react'
import styles from './content.module.scss'
import Product from '../Product'

function Content({ orders, shops }) {
  return (
    <div className={styles.container}>
      {Object.keys(shops).map((item) => (
        <Product key={item} orders={orders[item]} title={item} shop={shops[item]} />
      ))}
    </div>
  )
}

export default Content
