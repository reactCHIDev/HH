import React from 'react'
import T from 'prop-types'
import Heading from '../../components/heading'
import Input from '../../components/input'

const CreatePassword = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props
  return (
    <>
      <Heading category="Basic info" name="Create password" />
      <Input
        name={name}
        placeholder="password"
        value={value}
        focus
        onSubmit={onSubmit}
        registerObj={{
          required: true,
          minLength: {
            value: 8,
            message: 'Min length 8 symbols',
          },
        }}
      />
    </>
  )
}

CreatePassword.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
  }),
  onSubmit: T.func,
}

export default CreatePassword
