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
    key: 'name',
    direction: 'ascending',
  })

  React.useEffect(() => {
    setData(items)
  }, [items])

  return (
    <div className={styles.container}>
      <Heading title={title} />
      <Table data={data} requestSort={requestSort} />

      <ProductSummary shop={shop} />
    </div>
  )
}

export default Product
