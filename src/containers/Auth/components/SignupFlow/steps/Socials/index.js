import React from 'react'
import T from 'prop-types'
import Heading from '../../components/heading'
import Input from '../../components/input'

const Socials = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props
  return (
    <>
      <Heading category="Contact info (not-public)" name="Social / Website url" />
      <Input
        name={name}
        placeholder="URL"
        value={value[0]}
        onSubmit={onSubmit}
        registerObj={{
          required: true,
          pattern: {
            value: /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/,
            message: 'Invalid name symbols',
          },
        }}
      />
      <Input
        name={name}
        placeholder="URL"
        value={value[1]}
        onSubmit={onSubmit}
        registerObj={{
          required: true,
          pattern: {
            value: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
            message: 'Invalid name symbols',
          },
        }}
      />
      <Input
        name={name}
        placeholder="URL"
        value={value[2]}
        onSubmit={onSubmit}
        registerObj={{
          required: true,
          pattern: {
            value: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
            message: 'Invalid name symbols',
          },
        }}
      />
    </>
  )
}

Socials.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
  }),
  onSubmit: T.func,
}

export default Socials
