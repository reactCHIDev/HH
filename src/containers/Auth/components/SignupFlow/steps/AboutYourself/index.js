import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { useForm } from 'react-hook-form'
import Heading from '../../components/heading'
import styles from './aboutyourself.module.scss'

const AboutYourself = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props
  const [curTextValue, setTextValue] = useState(value)
  const { handleSubmit } = useForm()

  useEffect(() => {
    setTextValue(value)
    // eslint-disable-next-line
  }, [])

  const onChange = (e) => {
    setTextValue(e.target.value)
  }

  const skip = () => {
    onSubmit({ about: value })
  }

  return (
    <div className={styles.container}>
      <Heading category="Your profile" name="A few words about yourself" />
      <form
        className={styles.form}
        onSubmit={handleSubmit(() => onSubmit({ about: curTextValue }))}
      >
        <textarea
          className={styles.textarea}
          name={name}
          placeholder="about yourself"
          rows="10"
          cols="42"
          value={curTextValue}
          onChange={onChange}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
        <input className={styles.submit} type="submit" value=">" />
      </form>
      <p className={styles.skip} onClick={skip}>
        SKIP
      </p>
    </div>
  )
}

AboutYourself.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
  }),
  onSubmit: T.func,
}

export default AboutYourself
