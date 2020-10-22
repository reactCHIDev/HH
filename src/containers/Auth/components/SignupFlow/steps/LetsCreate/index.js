import React from 'react'
import Pasta from 'assets/images/signup-flow/svg/pasta-profile.svg'
import styles from './letscreate.module.scss'

const LetsCreate = () => {
  return (
    <>
      <img className={styles.pasta} src={Pasta} alt="pasta" />
      <p className={styles.heading}>Let's create your profile!</p>
      <p className={styles.description}>The whole process will take about 5 minutes</p>
    </>
  )
}

LetsCreate.propTypes = {}

export default LetsCreate
