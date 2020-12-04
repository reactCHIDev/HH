import React from 'react'

function OfflinePage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F2F3F5',
        width: '100%',
        height: '100vh',
      }}
    >
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          textAlign: 'center',
        }}
      >
        <h2>
          You Are Not Connected <br />
          to the Internet
        </h2>
      </div>
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
        }}
      >
        <h4>
          This page can't be displayed because your <br />
          computer is currently offline
        </h4>
      </div>
    </div>
  )
}

export default OfflinePage
