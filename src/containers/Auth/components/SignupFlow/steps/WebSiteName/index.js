import React from 'react'
import T from 'prop-types'
import Heading from '../../components/heading'
import Input from '../../components/input'
import styles from './websitename.module.scss'

const WebSiteName = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props
  return (
    <>
      <Heading category="Link" name="Your website link on HH" />
      <Input
        name={name}
        placeholder="public name"
        value={value}
        focus
        onSubmit={onSubmit}
        registerObj={{
          required: true,
          pattern: {
            value: /(?:https?:\/\/)?(?:www\.)?hungryhugger\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/,
            message: 'Invalid name symbols',
          },
        }}
      />
      <p className={styles.description}>
        Get a simple and memorable link to your Hungry Huggers profile
      </p>
    </>
  )
}

WebSiteName.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
  }),
  onSubmit: T.func,
}

export default WebSiteName
