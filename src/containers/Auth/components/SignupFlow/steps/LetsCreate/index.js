import React from 'react'
import Pasta from 'assets/images/signup-flow/svg/pasta-profile.svg'
import Progress from '../../components/Progress'
import styles from './letscreate.module.scss'

const LetsCreate = () => {
  return (
    <>
      <img className={styles.pasta} src={Pasta} alt="pasta" />
      <p className={styles.heading}>Let's create your profile!</p>
      <Progress />
    </>
  )
}

LetsCreate.propTypes = {}

export default LetsCreate
