import React from 'react'
import T from 'prop-types'
import styles from './step4.module.scss'
import './step4.less'

const Step4 = (props) => {
  const { setStep } = props

  return (
    <div className={styles.container}>
      <div className={styles.content} />
    </div>
  )
}

Step4.propTypes = {
  setStep: T.func.isRequired,
}

export default Step4
