import React from 'react'
import T from 'prop-types'
import styles from './tmp.module.scss'

const TMP = (props) => {
  const { steps, step, setStep } = props

  return (
    <div className={styles.container}>
      <h3>SELECT STEP</h3>
      <div>
        {steps.map((e, i) => (
          <p
            key={e.props.name}
            style={{ color: step === i ? 'red' : 'grey' }}
            onClick={() => setStep(i)}
          >
            {e.props.name}
          </p>
        ))}
      </div>
    </div>
  )
}

TMP.propTypes = {}

export default TMP
