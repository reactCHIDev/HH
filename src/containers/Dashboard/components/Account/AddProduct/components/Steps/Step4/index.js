import React from 'react'
import T from 'prop-types'
import styles from './step4.module.scss'
import './step4.less'

const Step4 = (props) => {
  const { step } = props

  return (
    <div className={styles.container}>
      <div className={styles.content} />
      {step}
    </div>
  )
}

Step4.propTypes = {
  step: T.number.isRequired,
}

export default Step4
