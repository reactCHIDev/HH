import React from 'react'
import Heading from './components/Heading'
import Content from './components/Content'
import Settings from './components/Settings'

import styles from './cart.module.scss'

function CartPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Heading />
        <Content />
        <Settings />
      </div>
    </div>
  )
}

export default CartPage
