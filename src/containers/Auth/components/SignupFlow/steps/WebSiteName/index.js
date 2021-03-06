/* eslint-disable no-shadow */
import React, { useState } from 'react'
import T from 'prop-types'
import { getUserByHHLink } from 'api/requests/Account'
import { useForm } from 'react-hook-form'
import Heading from '../../components/heading'
import styles from './websitename.module.scss'

const WebSiteName = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props

  const [curSiteValue, setSiteValue] = useState(
    value.replace(process.env.REACT_APP_BASE_URL, 'www.hungryhugger.com'),
  )

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  })

  const fixedText = 'www.hungryhugger.com/'

  const onChange = (e) => {
    const { value } = e.target
    if (value.substring(0, fixedText.length) === fixedText) setSiteValue(value)
  }

  const curUrl = curSiteValue.replace('www.hungryhugger.com', process.env.REACT_APP_BASE_URL)

  const submitData = {
    hungryHuggerLink: curUrl,
  }

  return (
    <div className={styles.container}>
      <Heading category="Link" name="Your website link on Hungry Hugger" />
      <form className={styles.form} onSubmit={handleSubmit(() => onSubmit(submitData))}>
        <div className={styles.input_wrapper}>
          <input
            name={name}
            value={curSiteValue}
            type="text"
            onChange={onChange}
            ref={register({
              required: true,
              validate: async (value) => {
                if (value.length > 21) {
                  const url = curSiteValue.replace(
                    'www.hungryhugger.com',
                    process.env.REACT_APP_BASE_URL,
                  )
                  const user = await getUserByHHLink(url)

                  return !user.data?.profileName
                }
                return false
              },
              pattern: {
                value: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{12,12}\.[a-z]{3,3}\b([-a-zA-Z0-9@:%_+.~#?&//=])/,
              },
            })}
          />
          {errors?.[name]?.type === 'required' && <p>This field is required</p>}
          {errors?.[name]?.type === 'pattern' && <p>Invalid symbols or format</p>}
          {errors?.[name]?.type === 'validate' && (
            <p>A user with these parameters already exists</p>
          )}
          {
            <button type="submit" className={styles.next}>
              {'>'}
            </button>
          }
        </div>
      </form>
      <p className={styles.description}>
        Get a simple and memorable link to your Hungry Hugger profile
      </p>
    </div>
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
