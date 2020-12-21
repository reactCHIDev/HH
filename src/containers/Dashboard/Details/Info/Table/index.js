import React from 'react'
import Row from './Row'

function Table() {
  return (
    <div>
      <div
        style={{
          width: ' 100%',
          display: 'flex',
          flexDirection: 'row',
          borderBottom: '1px solid gray',
        }}
      >
        <div style={{ width: '70%' }} />
        <div
          style={{
            width: '10%',
            color: '#838894',
            fontSize: '12px',
          }}
        >
          Qty
        </div>
        <div
          style={{
            width: '10%',
            color: '#838894',
            fontSize: '12px',
          }}
        >
          Price
        </div>
        <div
          style={{
            width: '10%',
            color: '#838894',
            fontSize: '12px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          Total
        </div>
      </div>
      <Row />
      <Row />
      <Row />
    </div>
  )
}

export default Table
