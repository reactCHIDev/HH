/* eslint-disable react/prop-types */ // TODO: fix this after finishing component
/* eslint-disable react/no-unused-state */ // TODO: fix this after finishing component

/* REACT */
import React from 'react'
import { connect } from 'react-redux'
import { format, isSameDay, parseISO } from 'date-fns'

/* MODULES */
import Calendar from 'react-calendar'
import { sendCurrDate } from 'actions/date-picker'

import styles from './datepicker.module.scss'
import './datepicker.scss'

function DatePicker(props) {
  const { onChange, setCalendarVisibility, date, events, setMonth } = props

  const tileClassName = ({ date }) => {
    // const { condition } = this.props
    // return date.getDay() % 1.5 ? 'event' : 'free'
    return events.some((e) => isSameDay(date, parseISO(e))) ? 'event' : 'free'
  }

  const tileContent = ({ activeStartDate, date, view }) => {
    return view === 'month' && isSameDay(date, new Date()) ? (
      <div className="today">today</div>
    ) : null
  }

  const onNav = ({ date, label, locale, view }) => {
    setMonth(date.toISOString())
    return label
  }

  return (
    <div>
      <div className="calendar__wrapper" onClick={setCalendarVisibility}>
        <Calendar
          value={date}
          locale="en"
          view="month"
          formatShortWeekday={(en, mDate) => format(mDate, 'EEEEE')}
          onClickDay={onChange}
          tileClassName={tileClassName}
          tileContent={tileContent}
          navigationLabel={onNav}
        />
      </div>
    </div>
  )
}

export default DatePicker
