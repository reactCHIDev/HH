import React from 'react'
import T from 'prop-types'

import styles from './about.module.scss'

function About({ isAdult, thingsToTake, summary }) {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h4>What we’ll do</h4>
        <p>{summary}</p>
      </div>
      <div className={styles.section}>
        <h4>What I’ll provide</h4>
        <p>{thingsToTake}</p>
      </div>
      {isAdult && (
        <div className={styles.section}>
          <h4>Additional requirement</h4>
          <p>You need to be 18 and above to attend this session.</p>
        </div>
      )}
    </div>
  )
}

About.propTypes = {
  isAdult: T.bool.isRequired,
  thingsToTake: T.string.isRequired,
  summary: T.string.isRequired,
}

export default About
