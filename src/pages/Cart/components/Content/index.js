/* eslint-disable react/prop-types */
import React from 'react'
import styles from './content.module.scss'
import Product from './components/Product'

function Content({ orders, shops }) {
  return (
    <div className={styles.container}>
      {shops.map((item) => (
        <Product orders={orders[item][0]} />
      ))}
    </div>
  )
}

export default Content
