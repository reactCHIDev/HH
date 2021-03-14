import React, { useState } from 'react'
import Chk1 from 'assets/images/signup-flow/svg/chk1.svg'
import Chk2 from 'assets/images/signup-flow/svg/chk2.svg'
import Progress from '../../components/Progress'

import styles from './congrats.module.scss'

const Congrats = () => {
  const [delay, setDelay] = useState(false)
  setTimeout(() => setDelay(true), 300)
  return (
    <>
      <div className={styles.chk_container}>
        {/* <img className={delay ? styles.knife_on : styles.knife_off} src={Knife} alt="chk" /> */}
        <img className={styles.chk1} src={Chk1} alt="chk" />
        {delay && <img className={styles.chk2} src={Chk2} alt="chk" />}
      </div>
      <p className={styles.heading}>Congratulation! You're all set!</p>
      <p className={styles.description}>Share your profile and create your first experience now!</p>
      <Progress />
    </>
  )
}

Congrats.propTypes = {}

export default Congrats
