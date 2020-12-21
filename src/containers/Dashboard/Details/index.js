import React from 'react'
import styles from './details.module.scss'
import Header from './Header'
import Info from './Info'

const Modal = () => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        top: '40%',
        left: '30%',
        border: '2px solid black',
        background: 'white',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        padding: '30px 20px 0 20px',
      }}
    >
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        Сancellation request (#362424)
      </div>
      <div style={{ textAlign: 'center' }}>
        Please describe the reason for the cancellation and we will send it to the maker to clarify
        the possibility of cancellation
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginBottom: '20px',
        }}
      >
        <div>Text your message</div>
        <textarea type="text" rows="7" placeholder="Input here" />
      </div>
      <button type="button">SEND</button>
    </div>
  )
}

function Details() {
  const [isCancelModalShown, setIsCancelModalShowm] = React.useState(false)
  return (
    <div className={styles.container}>
      {isCancelModalShown ? <Modal /> : null}
      <Header />
      <div className={styles.content}>
        <div className={styles.makerInfoWrapper}>
          <div className={styles.makerInfo} />
        </div>
        <Info setIsCancelModalShowm={setIsCancelModalShowm} />
      </div>
    </div>
  )
}

export default Details
