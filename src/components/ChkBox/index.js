/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

import T from 'prop-types'
import styles from './chkbox.module.scss'

const ChkBox = (props) => {
  const { id, labelText, name, checked, onChange, register } = props

  return (
    <label className={styles.label_chkbox} id={id}>
      <input
        type="checkbox"
        name={name}
        id={id}
        ref={register}
        checked={checked}
        onChange={onChange}
      />
      {labelText}
    </label>
  )
}

ChkBox.propTypes = {
  // id: T.string,
  labelText: T.string,
  checked: T.bool,
  onChange: T.func,
  name: T.string,
  register: T.func,
}

export default ChkBox
