import React, { useEffect, useRef, useState } from 'react'

import Logo from 'assets/images/logo_white.png'
import Meatball from 'assets/images/signup-flow/svg/meatball.svg'

import T from 'prop-types'
import styles from './signupflow_container.module.scss'

const SignupContainer = ({ children, footer, stepBack, step }) => {
  const [containerWidth, setWidth] = useState(0)
  const [containerHeight, setHeight] = useState(window.innerHeight)
  const container = useRef()

  const handleResize = () => setHeight(window.innerHeight)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (container.current) {
      setWidth(container.current.offsetWidth)
    }
  })

  return (
    <div className={styles.container} ref={container} /* style={{ height: containerHeight }} */>
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
            <div className={styles.btn_container}>
              <button type="button" className={styles.btn} onClick={stepBack}>
                {'< Back'}
              </button>
            </div>
          )}
          <div
            className={styles.progress}
            style={{
              width:
                step > 5 && step <= 17
                  ? (containerWidth / 17) * step
                  : step > 16 && step !== 19
                  ? containerWidth
                  : 0,
            }}
          >
            <div
              className={styles.meatball}
              style={{ transform: `rotate(${step <= 17 ? step * 220 : 17 * 220}deg)` }}
            >
              <img src={Meatball} alt="meatball" />
            </div>
          </div>
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
