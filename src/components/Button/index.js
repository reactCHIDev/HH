/* eslint-disable react/prop-types */
import React from 'react'
import T from 'prop-types'
import styles from './button.module.scss'

const Button = (props) => {
  const { title, dark = true, onClick, endDate } = props

  return (
    <button className={dark ? styles.btn : styles.white_btn} type="button" onClick={onClick}>
      {title}
      <br />
      {endDate && (
        <span>
          ends on {endDate.month} {endDate.day}
        </span>
      )}
    </button>
  )
}

Button.propTypes = {
  title: T.string,
  dark: T.bool,
  onClick: T.func,
}

export default Button
