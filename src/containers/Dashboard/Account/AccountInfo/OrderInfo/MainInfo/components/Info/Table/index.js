/* eslint-disable react/prop-types */
import React from 'react'
import Header from './Header'
import Row from './Row'

function Table({ orderInfo }) {
  return (
    <>
      <Header />
      {orderInfo.map((item) => (
        <Row item={item} key={item.id} />
      ))}
    </>
  )
}

export default Table
