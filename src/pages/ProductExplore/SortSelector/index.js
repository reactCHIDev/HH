import React from 'react'

function index({ requestSort }) {
  return (
    <div>
      <span>Sort by:</span>
      <span
        onClick={() => {
          requestSort('price')
        }}
      >
        lol
      </span>
    </div>
  )
}

export default index
