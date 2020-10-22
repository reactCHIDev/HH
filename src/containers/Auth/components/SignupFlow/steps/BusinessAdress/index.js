import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { useForm } from 'react-hook-form'

import Heading from '../../components/heading'
import MapUrl from 'assets/images/signup-flow/svg/mapurl.svg'
import Input from '../../components/input'
import styles from './adress.module.scss'

const BusinessAdress = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props
  const [curTextValue, setTextValue] = useState(value)
  const [curInputValue, setInputalue] = useState(value)
  const { register, handleSubmit, errors } = useForm()

  useEffect(() => {
    setTextValue(value.adress)
    setInputalue(value.mapURL)
  }, [])

  const onChange = (e) => {
    setTextValue(e.target.value)
  }
  const onChangeInput = (e) => {
    setInputalue(e.target.value)
  }

  const submitData = {
    businessAddressId: {
      adress: curTextValue,
      mapURL: curInputValue,
    },
  }

  const getMapPoint = () => {}

  return (
    <>
      <Heading category="Contact info (not-public)" name="Business address or Google map link" />
      <form className={styles.form} onSubmit={handleSubmit(() => onSubmit(submitData))}>
        <textarea
          className={styles.textarea}
          name={name}
          placeholder="adress"
          rows="3"
          cols="42"
          value={curTextValue}
          onChange={onChange}
          autoFocus
        />
        <div className={styles.input_wrapper}>
          <input
            name={name}
            placeholder="url"
            value={curInputValue}
            type="text"
            onChange={onChangeInput}
            ref={register()}
          />
          {errors?.[name]?.type === 'required' && <p>This field is required</p>}
          {errors?.[name]?.type === 'pattern' && <p>Invalid symbols or format</p>}
          {errors?.[name]?.type === 'minLength' && <p>Min length 8 symbols</p>}
          {
            <button type="button" className={styles.psw_eye} onClick={getMapPoint}>
              <img src={MapUrl} alt="mapurl" />
            </button>
          }
        </div>
        <button className={styles.submit} disabled={!curInputValue.length} type="submit">
          {'Next >'}
        </button>
      </form>
    </>
  )
}

BusinessAdress.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
  }),
  onSubmit: T.func,
}

export default BusinessAdress
