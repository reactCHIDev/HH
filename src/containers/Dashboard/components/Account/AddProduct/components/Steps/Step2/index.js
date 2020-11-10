import React from 'react'
import T from 'prop-types'
import styles from './step2.module.scss'
import './step2.less'

const Step2 = (props) => {
  const { setStep } = props

  return (
    <div className={styles.container}>
      <div className={styles.content} />
    </div>
  )
}

Step2.propTypes = {
  setStep: T.func.isRequired,
}

export default Step2
