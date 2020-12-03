import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { useForm } from 'react-hook-form'
import Modal from 'components/UniversalModal'
import Location from 'components/Location'
import MapUrl from 'assets/images/signup-flow/svg/mapurl.svg'
import Heading from '../../components/heading'
import styles from './adress.module.scss'

const BusinessAdress = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props
  const [showMap, setMap] = useState(false)
  const [curTextValue, setTextValue] = useState(value.adress)
  const [curInputValue, setInputalue] = useState(value.location)
  const { register, handleSubmit, errors } = useForm()

  useEffect(() => {
    setTextValue(value.adress)
    setInputalue(value.location)
  }, [])

  const onChange = (e) => {
    setTextValue(e.target.value)
  }
  const onChangeInput = (e) => {
    setInputalue(e.target.value)
  }

  const submitData = {
    businessAdress: {
      adress: curTextValue,
      location: curInputValue,
    },
  }

  const getMapPoint = () => {
    setMap(true)
  }

  return (
    <div className={styles.container}>
      {/* <Location /> */}
      <Heading category="Contact info (not-public)" name="Business address or Google map link" />
      <form className={styles.form} onSubmit={handleSubmit(() => onSubmit(submitData))}>
        <textarea
          className={styles.textarea}
          name="adress"
          placeholder="adress"
          rows="3"
          cols="42"
          value={curTextValue}
          onChange={onChange}
          autoFocus
        />
        <div className={styles.input_wrapper}>
          <input
            name="mapURL"
            placeholder="url"
            value={curInputValue}
            type="text"
            onChange={onChangeInput}
            ref={register({
              required: false,
            })}
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
        <button className={styles.submit} disabled={false} type="submit">
          {'Next >'}
        </button>
      </form>
      {showMap && (
        <Modal closeFunc={() => setMap(false)}>
          {/* <Location /> */}
          <div style={{ width: 500, height: 300, background: 'palegreen' }}>Google map</div>
        </Modal>
      )}
    </div>
  )
}

BusinessAdress.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.shape(),
  }),
  onSubmit: T.func,
}

export default BusinessAdress
