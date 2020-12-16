/* eslint-disable react/prop-types */
import React from 'react'
import styles from './product.module.scss'

import ProductSummary from './ProductSummary'
import Heading from './Heading'
// import Table from '../Table'
// import useSortableData from '../useSortable'

function Product({ orders }) {
  // const [data, setData] = React.useState()

  // const { items, requestSort } = useSortableData(item.elements, {
  //   key: 'name',
  //   direction: 'ascending',
  // })

  // React.useEffect(() => {
  //   setData(items)
  // }, [items])

  return (
    <div className={styles.container}>
      <Heading title={orders.title} />
      {/* <Table data={data} setData={setData} requestSort={requestSort} /> */}
      <ProductSummary />
    </div>
  )
}

export default Product
