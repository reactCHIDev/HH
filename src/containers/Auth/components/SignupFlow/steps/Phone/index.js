import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { Select } from 'antd'
import Heading from '../../components/heading'
import Input from '../../components/input'
import styles from './phone.module.scss'
import './phone.less'

const { Option } = Select

const PhoneStep = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props

  function handleChange(value) {
    console.log(`selected ${value}`)
  }

  return (
    <div>
      <Heading category="Contact info (not-public)" name="Phone" />
      <div className={cls(styles.container, 'select')}>
        <Input
          name={name}
          placeholder="phone"
          value={value}
          focus
          onSubmit={onSubmit}
          registerObj={{
            required: true,
            pattern: {
              value: /([- _():=+]?\d[- _():=+]?){10,14}(\s*)?/,
              message: 'Invalid name symbols or less than 8 digits',
            },
          }}
        />
      </div>
    </div>
  )
}

PhoneStep.propTypes = {}

export default PhoneStep
