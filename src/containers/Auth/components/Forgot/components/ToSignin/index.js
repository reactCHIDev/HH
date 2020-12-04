import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Checkmail from 'assets/images/checkmail.svg'
import _ from 'lodash/fp'
import T from 'prop-types'
import Chk1 from 'assets/images/signup-flow/svg/chk1.svg'
import Chk2 from 'assets/images/signup-flow/svg/chk2.svg'
import styles from './checkmail.module.scss'

const EnterMail = ({ close }) => {
  const [delay, setDelay] = useState(false)
  setTimeout(() => setDelay(true), 300)

  return (
    <div className={styles.content}>
      <div className={styles.chk_container}>
        <img className={styles.chk1} src={Chk1} alt="chk" />
        {delay && <img className={styles.chk2} src={Chk2} alt="chk" />}
      </div>
      <p className={styles.header}>Successful</p>
      <p className={styles.text}>Enter the new password in the sign-in window</p>
      <button type="button" onClick={close}>
        go to sign-in
      </button>
    </div>
  )
}

EnterMail.propTypes = {
  close: T.func,
}

export default EnterMail
