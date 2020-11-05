import React from 'react'

import T from 'prop-types'
import styles from './chkbox.module.scss'

const ChkBox = (props) => {
  const { labelText, name, checked, onChange, register } = props

  return (
    <label>
      <input type="checkbox" name={name} ref={register} checked={checked} onChange={onChange} />
      {labelText}
    </label>
  )
}

ChkBox.propTypes = {
  labelText: T.string.isRequired,
  checked: T.bool,
  onChange: T.func,
  name: T.string,
  register: T.func,
}

export default ChkBox
