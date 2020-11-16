import React from 'react'
import T from 'prop-types'
import styles from './exp_card.module.scss'
import './exp_card.less'

const ExpCard = (props) => {
  const { x } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}></div>
    </div>
  )
}

ExpCard.propTypes = {
  a: T.number.isRequired,
  b: T.string.isRequired,
  c: T.bool.isRequired,
  f: T.func.isRequired,
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
      content: T.node,
    }).isRequired,
  }).isRequired,
}

export default ExpCard
