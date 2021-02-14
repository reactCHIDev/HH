import React, { useEffect, useState } from 'react'
import T from 'prop-types'
import { Button, Select, DatePicker, Calendar, Radio, Col, Row, Typography } from 'antd'
import { format, toDate, getDate, getMonth, getYear, isSameDay } from 'date-fns'
import Finish from '../Finish'
import DatePick from 'components/DatePicker/DatePicker.js'
import moment from 'moment'
import { getItem, setItem } from 'utils/localStorage'
import cls from 'classnames'
import styles from './step4.module.scss'
import './step4.less'

const { Option } = Select
const { RangePicker } = DatePicker

const periods = ['No Repeat', 'Daily', 'Weekly', 'Monthly', 'Yearly']
const times = [
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
  '00:00',
]

const Step4 = () => {
  const [period, setPeriod] = useState('No Repeat')
  const [date, setDate] = useState(new Date())
  const [eventTime, setEventTime] = useState(null)

  function onPanelChange(value, mode) {
    console.log(value, mode)
  }

  const onRepeat = (data) => {
    setPeriod(data)
  }

  const onDateChange = (date) => {
    console.log('%c   date   ', 'color: darkgreen; background: palegreen;', date)
    setDate(date)
  }

  const createDate = (date, time) => {
    const year = getYear(date)
    const month = getMonth(date)
    const day = getDate(date)
    const [hours, minutes] = time.split(':').map(Number)
    console.log('%c   elems   ', 'color: white; background: royalblue;', {
      year,
      month,
      day,
      hours,
      minutes,
    })

    return toDate(new Date(year, month, day, hours, minutes)) // 2014, 1, 11, 11, 30
  }

  const onTimeSelect = (e) => {
    setEventTime(createDate(date, e.target.id))
  }

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Choose available date and time</p>
      <div className={styles.content}>
        <DatePick
          date={date}
          onChange={onDateChange}
          setSliderParams={() => {}}
          setCalendarVisibility={() => {}}
        />
        <div className={styles.timepicker_container}>
          <p className={styles.current_date}>{format(new Date(), 'dd MMM, yy')}</p>
          <div className={styles.time_section}>
            {times.map((t) => (
              <p className={styles.time} id={t} onClick={onTimeSelect}>
                {t}
              </p>
            ))}
          </div>
          <div className={cls(styles.selector_block, 'addexp')}>
            <div className={styles.date_picker}>
              <label className={styles.label}>Period</label>
              <RangePicker
                defaultValue={[new Date(), new Date()]}
                disabled={false}
                id="1"
                format="DD MMM YY"
                onChange={() => {}}
              />
            </div>
            <div className={styles.item_container}>
              <label className={styles.label}>Repeat</label>
              <Select onChange={onRepeat} name="Repeat" value={period}>
                {periods.map((per) => (
                  <Option key={per} value={per}>
                    {per}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className={cls(styles.btn_section, 'buttons')}>
            <div className={styles.btn_apply}>
              <Button
                block
                // disabled={fileList.length < 2 || !isActive}
                size="large"
              >
                APPLY
              </Button>
            </div>
            <div className={styles.btn_complete}>
              <Button
                type="primary"
                block
                // disabled={fileList.length < 2 || !isActive}
                size="large"
              >
                COMPLETE
              </Button>
            </div>
          </div>
        </div>
      </div>
      {false && <Finish />}
    </div>
  )
}

Step4.propTypes = {}

export default Step4
