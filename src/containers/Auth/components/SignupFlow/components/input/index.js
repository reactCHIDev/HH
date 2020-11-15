import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import T from 'prop-types'
import EyeOpen from 'assets/icons/svg/eye-open.svg'
import EyeClosed from 'assets/icons/svg/eye-closed.svg'
import styles from './input.module.scss'

const Input = ({ name, value, placeholder, registerObj, focus, fixedText, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm()
  const [curValue, setValue] = useState(value)
  const [type, setType] = useState('text')

  useEffect(() => {
    setValue(value)
    if (name === 'password') setType('password')
  }, [])

  const submit = (data) => {
    if (typeof onSubmit === 'function') onSubmit(data)
  }

  const onChange = (e) => {
    const value = e.target.value
    if (fixedText) {
      if (value.substring(0, fixedText.length) === fixedText) setValue(e.target.value)
      return
    }
    setValue(e.target.value)
  }

  const togglePassword = () => {
    setType(type === 'password' ? 'text' : 'password')
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <div className={styles.input_wrapper}>
          <input
            name={name}
            placeholder={placeholder}
            value={curValue}
            type={type}
            onChange={onChange}
            autoFocus={focus}
            ref={register(registerObj)}
          />
          {errors?.[name]?.type === 'required' && <p>This field is required</p>}
          {errors?.[name]?.type === 'pattern' && <p>Invalid format or length</p>}
          {errors?.[name]?.type === 'minLength' && <p>`Min length 8 symbols`</p>}
          {errors?.[name]?.type === 'validate' && (
            <p>A user with these parameters already exists</p>
          )}
          {name === 'password' && (
            <button type="button" className={styles.psw_eye} onClick={togglePassword}>
              <img src={type === 'password' ? EyeOpen : EyeClosed} alt="eye" />
            </button>
          )}
          <input className={styles.submit} type="submit" value=">" />
        </div>
      </form>
    </div>
  )
}

Input.propTypes = {
  name: T.string,
  value: T.string,
  placeholder: T.string,
  focus: T.bool,
  fixedText: T.string,
  onSubmit: T.func,
  registerObj: T.shape(),
}

export default Input
