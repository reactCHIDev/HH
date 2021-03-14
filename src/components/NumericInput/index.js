/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import T from 'prop-types'

function formatNumber(val) {
  const value = String(val)
  const list = value.split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
}

const NumInput = (props) => {
  const { onChange } = props

  onNumericChange = (e) => {
    const { value } = e.target
    const reg = /^-?\d*(\.\d*)?$/
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      props.onChange(value)
    }
  }

  // '.' at the end or only '-' in the input box.
  onNumericBlur = () => {
    const { value, onBlur, onChange } = this.props
    let valueTemp = value
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1)
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'))
    if (onBlur) {
      onBlur()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content} />
    </div>
  )
}

NumInput.propTypes = {
  onChange: T.func.isRequired,
}

export default NumInput
