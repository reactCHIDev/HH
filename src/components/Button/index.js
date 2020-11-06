import React from 'react'
import T from 'prop-types'
import styles from './button.module.scss'

const Button = (props) => {
  const { title, onClick } = props

  return (
    <button className={styles.btn} type="button" onClick={onClick}>
      {title}
    </button>
  )
}

Button.propTypes = {
  title: T.string,
  onClick: T.func,
}

export default Button
