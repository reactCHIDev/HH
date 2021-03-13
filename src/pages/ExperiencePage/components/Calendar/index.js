/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useCallback, useMemo } from 'react'
import cls from 'classnames'
import { format, getMinutes, getHours, parseISO, isSameDay } from 'date-fns'
import Slider from 'react-slick'
import Lock from 'assets/icons/svg/dop.svg'
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
    duration,
  } = props

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
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 6,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 480,
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
    // eslint-disable-next-line
  }, [])

  const handleTimeClick = useCallback((e) => {
    setSelectedTime(e.currentTarget.id)
    // eslint-disable-next-line
  }, [])

  const getAvailablePlaces = (appointmentTime, bookingList, guestsLimit) => {
    const booking = bookingList.filter((b) => b.time === appointmentTime)
    const available = booking.length
      ? guestsLimit -
        booking.reduce((acc, el) => acc + (el.guests?.adults || 0) + (el.guests?.children || 0), 0)
      : guestsLimit

    return available
  }

  function formatter(value) {
    const time = value * 5 + 30
    const h = Math.floor(time / 60)
    const m = time % 60
    return `${h ? `${h}h` : ''} ${m ? `${m}m ` : ''}`
  }

  // if (!dates?.length) return <></>
  return (
    <div className={styles.main_container}>
      <div className={cls(styles.slider_container, 'slick_experience')}>
        <label className={styles.label}>Select date</label>
        <Slider {...settings}>
          {dates.map((date) => (
            <div key={date}>
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
        <label className={cls(styles.label, selectedTime ? '' : styles.red_label)}>
          {`Select time (${formatter(duration)} duration)`}
        </label>
        <Slider {...settings} key={appointments}>
          {appointments.map((time) => {
            const left = getAvailablePlaces(time, bookingsByDate, guests)
            return (
              <div key={time}>
                <div
                  className={cls(
                    styles.preview_container,
                    time === selectedTime
                      ? styles.selected
                      : left > 0
                      ? styles.regular
                      : styles.locked_day,
                  )}
                  key={time}
                  id={time}
                  onClick={left > 0 && handleTimeClick}
                >
                  <span className={left > 0 ? '' : styles.time_text}>
                    {`${String(getHours(parseISO(time))).padStart(2, '0')}:${String(
                      getMinutes(parseISO(time)),
                    ).padStart(2, '0')}`}
                  </span>
                  <div
                    className={
                      left > 0 ? (left > 2 ? styles.available : styles.red) : styles.time_text
                    }
                  >
                    {`${left} left`}
                  </div>
                  {left === 0 && (
                    <div className={styles.locked}>
                      <img className={styles.lock_img} src={Lock} alt="lock" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

DateSlider.propTypes = {}

export default DateSlider
