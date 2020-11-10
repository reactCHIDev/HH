import React from 'react'
import T from 'prop-types'
import styles from './step3.module.scss'
import './step3.less'

const Step3 = (props) => {
  const { step } = props

  return (
    <div className={styles.container}>
      <div className={styles.content} />
      {step}
    </div>
  )
}

Step3.propTypes = {
  step: T.number.isRequired,
}

export default Step3
