import React from 'react'
import T from 'prop-types'
import Heading from '../../components/heading'
import Input from '../../components/input'

const PhoneStep = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props
  return (
    <>
      <Heading category="Contact info (not-public)" name="Phone" />
      <Input
        name={name}
        placeholder="phone"
        value={value}
        onSubmit={onSubmit}
        registerObj={{
          required: true,
          pattern: {
            value: /(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?/,
            message: 'Invalid name symbols',
          },
        }}
      />
    </>
  )
}

PhoneStep.propTypes = {}

export default PhoneStep
