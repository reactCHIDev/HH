import React from 'react'
import T from 'prop-types'
import styles from './step2.module.scss'
import './step2.less'

const Step2 = (props) => {
  const { step } = props

  return (
    <div className={styles.container}>
      <div className={styles.content} />
      {step}
    </div>
  )
}

Step2.propTypes = {
  step: T.number.isRequired,
}

export default Step2
