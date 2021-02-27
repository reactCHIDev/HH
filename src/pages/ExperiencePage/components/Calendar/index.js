import React, { useState, useEffect, useCallback, useMemo } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import {
  format,
  getMinutes,
  getHours,
  parseISO,
  isSameDay,
  differenceInMinutes,
  isBefore,
  startOfToday,
} from 'date-fns'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './exp_calendar.module.scss'
import './exp_calendar.less'

const DateSlider = (props) => {
  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    dates,
    appointments,
    bookingsByDate,
    guests,
    available,
  } = props

  const [actualDates, setActualDates] = useState([])

  useEffect(() => {
    if (dates?.length) setSelectedDate(dates[0])
    setActualDates(
      dates.filter(
        (d) =>
          !isBefore(parseISO(d), startOfToday()) &&
          appointments.filter((t) => differenceInMinutes(parseISO(t), new Date()) > 0).length > 0,
      ),
    )
  }, [dates])
  console.log('%c   dates   ', 'color: white; background: royalblue;', dates)
  console.log('%c   actualDates   ', 'color: white; background: royalblue;', actualDates)
  console.log('%c   appointments   ', 'color: white; background: royalblue;', appointments)

  const settings = useMemo(
    () => ({
      draggable: true,
      touchThreshold: 30,
      useCSS: true,
      swipeToSlide: true,
      infinite: false,
      speed: 500,
      slidesToScroll: 1,
      arrows: true,
      slidesToShow: 6,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 540,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 440,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 3,
          },
        },
      ],
    }),
    [],
  )

  const handleDateClick = useCallback((e) => {
    setSelectedDate(e.currentTarget.id)
  })

  const handleTimeClick = useCallback((e) => {
    setSelectedTime(e.currentTarget.id)
  })

  const getAvailablePlaces = (appointmentTime, bookingList, guestsLimit) => {
    const booking = bookingList.find((b) => b.time === appointmentTime)
    const available = booking
      ? guestsLimit - (booking.guests?.adults || 0) - (booking.guests?.children || 0)
      : guestsLimit

    return available
  }

  // if (!dates?.length) return <></>
  return (
    <div className={styles.main_container}>
      <div className={cls(styles.slider_container, 'slick_experience')}>
        <label className={styles.label}>Select date</label>
        <Slider {...settings}>
          {dates.map((date) => (
            <div>
              <div
                className={cls(
                  styles.preview_container,
                  isSameDay(parseISO(date), parseISO(selectedDate))
                    ? styles.selected
                    : styles.regular,
                )}
                key={date}
                id={date}
                onClick={handleDateClick}
              >
                {format(parseISO(date), 'dd MMM eee')}
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className={cls(styles.slider_container, 'slick_experience')}>
        <label className={styles.label}>Select time</label>
        <Slider {...settings}>
          {appointments.map((time) => (
            <div>
              <div
                className={cls(
                  styles.preview_container,
                  time === selectedTime ? styles.selected : styles.regular,
                )}
                key={time}
                id={time}
                onClick={handleTimeClick}
              >
                {`${String(getHours(parseISO(time))).padStart(2, '0')}:${String(
                  getMinutes(parseISO(time)),
                ).padStart(2, '0')}`}
                <div className={styles.available}>
                  {`${getAvailablePlaces(time, bookingsByDate, guests)} left`}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

DateSlider.propTypes = {
  images: T.arrayOf(T.string).isRequired,
}

export default DateSlider
