import React, { useState } from 'react'
import T from 'prop-types'
import { useForm } from 'react-hook-form'
import Heading from '../../components/heading'
import styles from './websitename.module.scss'

const WebSiteName = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props

  const [curSiteValue, setSiteValue] = useState(value)

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  })

  const fixedText = 'www.hungryhugger.com/'

  const onChange = (e) => {
    const { value } = e.target
    if (value.substring(0, fixedText.length) === fixedText) setSiteValue(value)
  }

  const submitData = {
    hungryHuggerLink: curSiteValue,
  }

  return (
    <div className={styles.container}>
      <Heading category="Link" name="Your website link on HH" />
      <form className={styles.form} onSubmit={handleSubmit(() => onSubmit(submitData))}>
        <div className={styles.input_wrapper}>
          <input
            name={name}
            value={curSiteValue}
            type="text"
            onChange={onChange}
            ref={register({
              pattern: {
                value: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                message: 'Invalid name symbols',
              },
            })}
          />
          {errors?.hh?.type === 'required' && <p>This field is required</p>}
          {errors?.hh?.type === 'pattern' && <p>Invalid symbols or format</p>}
          {
            <button type="submit" className={styles.next}>
              {'>'}
            </button>
          }
        </div>
      </form>
      <p className={styles.description}>
        Get a simple and memorable link to your Hungry Huggers profile
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