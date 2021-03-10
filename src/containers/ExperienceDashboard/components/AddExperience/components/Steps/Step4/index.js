import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Select, DatePicker } from 'antd'
import {
  format,
  toDate,
  getHours,
  getMinutes,
  getDate,
  getMonth,
  getYear,
  isSameDay,
  parseISO,
} from 'date-fns'
import DatePick from 'components/DatePicker/DatePicker'
import { getExperiencesByDateAC } from 'actions/experience'
import { getItem } from 'utils/localStorage'
import cls from 'classnames'
import Finish from '../Finish'
import styles from './step4.module.scss'
import './step4.less'

// const { Option } = Select
// const { RangePicker } = DatePicker
// const periods = ['No Repeat', 'Daily', 'Weekly', 'Monthly', 'Yearly']

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

const Step4 = ({ create, edit }) => {
  const prevData = getItem('addExperience')

  const [date, setDate] = useState(new Date())
  const [eventTime, setEventTime] = useState('')
  const [events, setEvents] = useState(prevData.time?.length ? prevData.time : [])
  const [month, setMonth] = useState(new Date().toISOString())
  const [btnAction, setBtnAction] = useState('Apply')

  const expsByDate = useSelector((state) => state.expListing.monthExperiences)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getExperiencesByDateAC(month))
  }, [month])

  useEffect(() => {
    if (events.includes(eventTime)) {
      setBtnAction('Clear')
    } else {
      setBtnAction('Apply')
    }
  }, [eventTime])

  /*
  const [period, setPeriod] = useState('Weekly')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  
  const onRepeat = (data) => {
    setPeriod(data)
  }

  const onRangeSelect = (dates) => {
    setStartDate(new Date(dates[0]).toISOString())
    setEndDate(new Date(dates[1]).toISOString())
  }
  */

  const onDateChange = (selectedDate) => setDate(selectedDate)

  const createDate = (date, time) => {
    const year = getYear(date)
    const month = getMonth(date)
    const day = getDate(date)
    const [hours, minutes] = time.split(':').map(Number)
    const eventDate = toDate(new Date(year, month, day, hours, minutes)).toISOString() // 2014, 1, 11, 11, 30
    return eventDate
  }

  const isBooked = (time) => {
    return events.some(
      (e) =>
        isSameDay(date, parseISO(e)) &&
        `${String(getHours(parseISO(e))).padStart(2, '0')}:${String(
          getMinutes(parseISO(e)),
        ).padStart(2, '0')}` === time,
    )
  }

  const onTimeSelect = (e) => {
    setEventTime(createDate(date, e.target.id))
    /* if (!isBooked(e.target.id)) {
      setEventTime(createDate(date, e.target.id))
    } else {
      setEventTime('')
    } */
  }

  const onApply = () => {
    if (eventTime) {
      if (btnAction === 'Apply') {
        setEvents(events.concat([eventTime]))
        setEventTime('')
      }
      if (btnAction === 'Clear') {
        setEvents(events.filter((e) => e !== eventTime))
        setEventTime('')
      }
    }
  }

  const onComplete = () => {
    const dateTime = {
      additionalInfo: 'You need to be 18 and above to attend this session.',
      location: '49.9878502,36.199552',
      status: 'PUBLISHED',
      time: events,
    }
    const payload = {
      ...prevData,
      ...dateTime,
    }
    dispatch(create(payload))
  }

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Choose available date and time</p>
      <div className={styles.content}>
        <DatePick
          events={events}
          date={date}
          onChange={onDateChange}
          setSliderParams={() => {}}
          setCalendarVisibility={() => {}}
          setMonth={setMonth}
        />
        <div className={styles.timepicker_container}>
          <p className={styles.current_date}>{format(new Date(), 'dd MMM, yy')}</p>
          <div className={styles.time_section}>
            {times.map((t) => (
              <p
                key={t}
                className={
                  t ===
                  `${String(getHours(parseISO(eventTime))).padStart(2, '0')}:${String(
                    getMinutes(parseISO(eventTime)),
                  ).padStart(2, '0')}`
                    ? styles.clickedTime
                    : isBooked(t)
                    ? styles.bookedTime
                    : styles.time
                }
                id={t}
                onClick={onTimeSelect}
              >
                {t}
              </p>
            ))}
          </div>
          {/*  <div className={cls(styles.selector_block, 'addexp')}>
            <div className={styles.date_picker}>
              <label className={styles.label}>Period</label>
              <RangePicker
                // defaultValue={[new Date(), new Date()]}
                disabled={false}
                id="1"
                format="DD MMM YY"
                onChange={onRangeSelect}
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
          </div> */}
          <div className={cls(styles.btn_section, 'buttons')}>
            <div className={styles.btn_apply}>
              <Button block size="large" onClick={onApply} disabled={!eventTime}>
                {eventTime ? btnAction : 'Select time'}
              </Button>
            </div>
            <div className={styles.btn_complete}>
              <Button
                type="primary"
                block
                onClick={onComplete}
                size="large"
                disabled={!events.length}
              >
                {edit ? 'UPDATE' : 'COMPLETE'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {false && <Finish />}
    </div>
  )
}

Step4.propTypes = {
  create: T.func.isRequired,
}

export default Step4
