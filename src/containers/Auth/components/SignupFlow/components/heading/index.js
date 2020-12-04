import React from 'react'
import T from 'prop-types'
import styles from './heading.module.scss'

const Heading = (props) => {
  const { category, name } = props

  return (
    <div className={styles.container}>
      <p className={styles.category}>{category}</p>
      <p className={styles.name}>{name}</p>
    </div>
  )
}

Heading.propTypes = {
  category: T.string.isRequired,
  name: T.string.isRequired,
}

export default Heading
