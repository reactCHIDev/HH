/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import T from 'prop-types'
import Heading from '../../components/heading'
import styles from './city.module.scss'

const CityStep = (props) => {
  const {
    properties: { name, value, cities },
    onSubmit,
  } = props

  const [curValue, setValue] = useState(
    value ? cities.find((city) => city.id === value).cityName : '',
  )
  const [suggestions, setSuggestions] = useState([])
  const [visible, setVisible] = useState(false)

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : cities.filter((city) => city.cityName.toLowerCase().slice(0, inputLength) === inputValue)
  }

  const onChange = (e) => {
    const { value } = e.target
    const s = getSuggestions(value)
    setSuggestions(s)
    setValue(value)
    if (s.length) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  const selectSugg = (e) => {
    setValue(e.target.innerText)
    setVisible(false)
  }

  const onNext = () => {
    onSubmit({ city: cities.find((city) => city.cityName === curValue).id })
  }

  return (
    <>
      <Heading category="Basic info" name="City" />
      <div className={styles.input_wrapper}>
        <input name={name} value={curValue} type="text" autoComplete="off" onChange={onChange} />
        {visible && (
          <div className={styles.sugg_container}>
            {suggestions.map((s) => (
              <div className={styles.sugg} onClick={selectSugg}>
                <div className={styles.sugg_text}>{s.cityName}</div>
              </div>
            ))}
          </div>
        )}
        <button type="button" className={styles.next} onClick={onNext}>
          {'>'}
        </button>
      </div>
      {/*  <Input
        name={name}
        placeholder="City"
        value={value}
        onSubmit={onSubmit}
        registerObj={{
          required: true,
          pattern: {
            value: /^(?=.{1,15}$)[a-zA-Z][a-zA-Z0-9]*(?: [a-zA-Z0-9]+)*$/,
            message: 'Invalid name symbols',
          },
        }}
      /> */}
    </>
  )
}

CityStep.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
  }),
  onSubmit: T.func,
  cities: T.arrayOf(T.shape),
}

export default CityStep
