import React, { useState } from 'react'
import T from 'prop-types'
import { Radio } from 'antd'

import styles from './formitem.module.scss'

const FormItem = (props) => {
  const { city, available, id, closemodal, editCityAC } = props

  const [cityName, setCityName] = useState(city)
  const [availability, setAvailability] = useState(available)

  const onChangeCityName = (e) => setCityName(e.target.value)
  const onRadio = (e) => setAvailability(e.target.value)

  const onSubmit = () => {
    editCityAC({ id, cityName, availability })
    closemodal()
  }

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.form}>
        <input
          className={styles.textarea}
          name="cityName"
          value={cityName}
          onChange={onChangeCityName}
        />
        {!cityName && <p>This field is required</p>}

        <div className={styles.chk}>
          <Radio.Group onChange={onRadio} value={availability}>
            <Radio style={styles.radioStyle} value="Available">
              Available
            </Radio>
            <Radio style={styles.radioStyle} value="Unavailable">
              Unavailable
            </Radio>
            <Radio style={styles.radioStyle} value="Coming soon">
              Coming soon
            </Radio>
          </Radio.Group>
        </div>

        <input className={styles.submit_btn} onClick={onSubmit} value="SAVE" disabled={!cityName} />
      </div>
    </div>
  )
}

FormItem.propTypes = {
  question: T.string,
  answer: T.string,
}

export default FormItem
