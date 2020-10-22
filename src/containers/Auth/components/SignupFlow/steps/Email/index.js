import React from 'react'
import T from 'prop-types'
import Heading from '../../components/heading'
import Input from '../../components/input'

const EmailStep = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props
  return (
    <>
      <Heading category="Basic info" name="Contact e-mail" />
      <Input
        name={name}
        placeholder="email"
        value={value}
        onSubmit={onSubmit}
        registerObj={{
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
      />
    </>
  )
}

EmailStep.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
  }),
  onSubmit: T.func,
}

export default EmailStep
