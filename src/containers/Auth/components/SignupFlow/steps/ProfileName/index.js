import React from 'react'
import T from 'prop-types'
import { getUserByName } from 'api/requests/Auth'
import Heading from '../../components/heading'
import Input from '../../components/input'
import styles from './profilename.module.scss'

const ProfileName = (props) => {
  const {
    properties: { name, value, profileName },
    onSubmit,
  } = props
  return (
    <>
      <Heading category="Your profile" name="Set public profile name" />
      <Input
        name={name}
        placeholder="public name"
        value={profileName || value}
        focus
        onSubmit={onSubmit}
        registerObj={{
          required: true,
          validate: async (value) => {
            if (value === profileName) return true
            const user = await getUserByName(value)
            return !user.data?.profileName
          },
          pattern: {
            value: /^(?=.{2,200}$)[a-zA-Z][a-zA-Z0-9]*(?: [a-zA-Z0-9]+)*$/,
            message: 'Invalid name symbols',
          },
        }}
      />
    </>
  )
}

ProfileName.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
    profileName: T.string,
  }),
  onSubmit: T.func,
}

export default ProfileName
