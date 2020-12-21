import React from 'react'

function Row() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: '10px 0 10px 0',
        borderBottom: '1px solid black',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '70%', display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: '60px',
            height: '60px',
            background: 'skyblue',
            borderRadius: '10px',
            marginRight: '10px',
          }}
        />
        <div>
          <div>Pie with carrots, apple and cinnamon</div>
          <div>#343243</div>
        </div>
      </div>
      <div style={{ width: '10%' }}>6</div>
      <div style={{ width: '10%' }}>$ 8.00</div>
      <div style={{ width: '10%', display: 'flex', justifyContent: 'flex-end' }}>$ 48.00</div>
    </div>
  )
}

export default Row
