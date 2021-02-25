import React, { useState, useEffect, useCallback, useMemo } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { format, addDays, isSameDay } from 'date-fns'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './exp_calendar.module.scss'
import './exp_calendar.less'

const DateSlider = (props) => {
  const { images } = props
  const [selectedDate, setSelectedDate] = useState()
  const [dates, setDates] = useState([])

  useEffect(() => {
    let d = []
    for (let i = -7; i < 7; i += 1) {
      d = [...d, addDays(new Date(), i)]
    }
    setDates(d)
  }, [])

  useEffect(() => {
    if (dates?.length) setSelectedDate(dates[7])
  }, [dates])

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
      initialSlide: 7,
      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />,
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
                  isSameDay(new Date(date), new Date(selectedDate))
                    ? styles.selected
                    : styles.regular,
                )}
                key={date}
                id={date}
                onClick={handleDateClick}
              >
                {format(date, 'dd MMM eee')}
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className={cls(styles.slider_container, 'slick_experience')}>
        <label className={styles.label}>Select time</label>
        <Slider {...settings}>
          {dates.map((date) => (
            <div>
              <div
                className={cls(
                  styles.preview_container,
                  isSameDay(new Date(date), new Date(selectedDate))
                    ? styles.selected
                    : styles.regular,
                )}
                key={date}
                id={date}
                onClick={handleDateClick}
              >
                {format(date, 'dd MMM eee')}
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
