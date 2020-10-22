import React from 'react'

import Logo from 'assets/images/logo_white.png'

import T from 'prop-types'
import styles from './signupflow_container.module.scss'

const SignupContainer = ({ children, footer, stepBack, step }) => {
  return (
    <div className={styles.container}>
      <div className={styles.pattern} />
      <div className={styles.header}>
        <div className={styles.logo_container}>
          <img src={Logo} alt="logo" />
        </div>
      </div>
      <div className={styles.content}>{children}</div>
      {footer && (
        <div className={styles.footer}>
          {step > 0 && step !== 5 && step < 17 && (
            <button type="button" className={styles.btn} onClick={stepBack}>
              {'< Back'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

SignupContainer.propTypes = {
  children: T.node,
  footer: T.bool,
  stepBack: T.func,
  step: T.number,
}

export default SignupContainer
