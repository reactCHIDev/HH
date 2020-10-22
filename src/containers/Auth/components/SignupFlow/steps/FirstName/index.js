import React from 'react'
import T from 'prop-types'
import Heading from '../../components/heading'
import Input from '../../components/input'

const FirstNameStep = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props
  return (
    <>
      <Heading category="Basic info" name="First name" />
      <Input
        name={name}
        placeholder="First name"
        value={value}
        onSubmit={onSubmit}
        registerObj={{
          required: true,
          pattern: {
            value: /^(?=.{1,15}$)[a-zA-Z][a-zA-Z0-9]*(?: [a-zA-Z0-9]+)*$/,
            message: 'Invalid name symbols',
          },
        }}
      />
    </>
  )
}

FirstNameStep.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
  }),
  onSubmit: T.func,
}

export default FirstNameStep
