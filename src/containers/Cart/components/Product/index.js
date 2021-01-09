/* eslint-disable react/prop-types */
import React from 'react'

import useSortableData from 'hooks/useSortable'
import ProductSummary from './components/Summary'
import Heading from './components/Heading'
import Table from './components/Table'

import styles from './product.module.scss'

function Product({ orders, title, shop }) {
  const [data, setData] = React.useState()

  const { items, requestSort } = useSortableData(orders, {
    key: 'title',
    direction: 'ascending',
  })

  React.useEffect(() => {
    setData(items)
  }, [items])

  return (
    <div className={styles.container}>
      <Heading shop={orders[0].shop} />
      <Table data={data} requestSort={requestSort} />
      <ProductSummary shop={shop} title={title} />
    </div>
  )
}

export default Product
