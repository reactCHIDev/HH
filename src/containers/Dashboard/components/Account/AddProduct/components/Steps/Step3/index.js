import React from 'react'
import T from 'prop-types'
import styles from './step3.module.scss'
import './step3.less'

const Step3 = (props) => {
  const { setStep } = props

  return (
    <div className={styles.container}>
      <div className={styles.content} />
    </div>
  )
}

Step3.propTypes = {
  setStep: T.func.isRequired,
}

export default Step3
