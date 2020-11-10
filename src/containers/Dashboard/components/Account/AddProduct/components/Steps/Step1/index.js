import React from 'react'
import T from 'prop-types'
import styles from './step1.module.scss'
import './step1.less'

const Step1 = (props) => {
  const { step } = props

  return (
    <div className={styles.container}>
      <div className={styles.content} />
      {step}
    </div>
  )
}

Step1.propTypes = {
  step: T.number.isRequired,
}

export default Step1
