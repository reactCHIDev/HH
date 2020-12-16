import React from 'react'
import styles from './content.module.scss'
import Product from './components/Product'
import data from './mocks'

function Content() {
  return (
    <div className={styles.container}>
      {data.map((item) => (
        <Product key={item.name} item={item} />
      ))}
    </div>
  )
}

export default Content
