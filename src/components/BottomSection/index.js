import React from 'react'
import styles from './bottom.module.scss'

const BottomSection = () => {
  return (
    <section className={styles.bottom_sec}>
      <div className={styles.joincard}>
        <p>Join a global community of food lovers and food makers</p>
        <button type="button">Join now!</button>
      </div>
    </section>
  )
}

BottomSection.propTypes = {}

export default BottomSection
