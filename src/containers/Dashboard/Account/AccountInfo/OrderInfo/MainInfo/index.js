import React from 'react'
import T from 'prop-types'
import AboutMaker from 'pages/ProductPage/components/AboutMaker'
import styles from './maininfo.module.scss'
import Header from './components/Header'
import Modal from './components/Modal'
import Info from './components/Info'

const MainOrderInfo = (props) => {
  const { orderHash } = props
  // eslint-disable-next-line no-console
  console.log(orderHash)

  const [isCancelModalShown, setIsCancelModalShowm] = React.useState(false)

  const escFunction = React.useCallback((event) => {
    if (event.keyCode === 27) {
      setIsCancelModalShowm(false)
    }
  }, [])

  React.useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [])
  return (
    <div className={styles.container}>
      {isCancelModalShown ? <Modal /> : null}
      <Header />
      <div className={styles.content}>
        <div className={styles.makerInfoWrapper}>
          <AboutMaker name="sasha" text="asdjasdk ljkafj jdf j j" photo={null} />
        </div>
        <Info setIsCancelModalShowm={setIsCancelModalShowm} />
      </div>
    </div>
  )
}

MainOrderInfo.propTypes = {
  orderHash: T.string,
}

export default MainOrderInfo
