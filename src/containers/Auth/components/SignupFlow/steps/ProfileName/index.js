import React from 'react'
import T from 'prop-types'
import Heading from '../../components/heading'
import Input from '../../components/input'
import styles from './profilename.module.scss'

const ProfileName = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props
  return (
    <>
      <Heading category="Your profile" name="Set public profile name" />
      <Input
        name={name}
        placeholder="public name"
        value={value}
        focus
        onSubmit={onSubmit}
        registerObj={{
          required: true,
          pattern: {
            value: /^(?=.{1,15}$)[a-zA-Z][a-zA-Z0-9]*(?: [a-zA-Z0-9]+)*$/,
            message: 'Invalid name symbols',
          },
        }}
      />
      <p className={styles.description}>An easy to remember name with a humour</p>
    </>
  )
}

ProfileName.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
  }),
  onSubmit: T.func,
}

export default ProfileName
