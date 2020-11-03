import React from 'react'
import T from 'prop-types'
import styles from './chkbox.module.scss'

const ChkBox = (props) => {
  const { labelText, onChange } = props

  return (
    <label>
      <input type="checkbox" name="checkbox1" value="value" />
      {labelText}
    </label>
  )
}

ChkBox.propTypes = {
  labelText: T.string.isRequired,
  onChange: T.func,
}

export default ChkBox
