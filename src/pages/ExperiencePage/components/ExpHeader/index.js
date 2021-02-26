import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { getBookingByDateAC } from 'actions/experience'
import { stripeCheckoutAC } from 'actions/stripe'
import { parseISO, isSameDay, getDate, getMonth, getYear } from 'date-fns'
import { Button } from 'antd'
import { setItem } from 'utils/localStorage'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import ImagePreviewer from 'pages/ProductPage/components/ImagePreviewer'
import GuestsSelector from '../GuestsSelector'
import Calendar from '../Calendar'
import styles from './exp_page_header.module.scss'
import './exp_page_header.less'

const ExpHeader = ({ experience, user, bookingsByDate }) => {
  const { id, coverPhoto, otherPhotos, guests, discount, time, priceAdult, priceChild } = experience
  const { firstName, lastName } = user

  const [selectedDate, setSelectedDate] = useState()
  const [selectedTime, setSelectedTime] = useState()
  const [dates, setDates] = useState([])
  const [appointments, setAppointments] = useState([])
  const [visible, setVisibilityGuestsSelector] = useState(false)
  const [adult, setAdultCount] = useState(1)
  const [childrenn, setChildrenCount] = useState(0)
  const [total, setTotal] = useState(0)

  const dispatch = useDispatch()

  const { handleSubmit, control, errors } = useForm({
    mode: 'onBlur',
  })

  const onBook = (data) => {
    const bookData = {
      guests: {
        adults: adult,
        children: childrenn,
      },
      time: selectedTime,
      experienceId: id,
      totalPrice: Number(total),
      currency: 'HKD',
      firstName,
      lastName,
      phone: '123 12345678',
    }
    if (total > 0) {
      setItem('booking', bookData)
      dispatch(stripeCheckoutAC('booking', total))
    }

    console.log('%c   bookData   ', 'color: darkgreen; background: palegreen;', bookData)
  }

  useEffect(() => {
    if (selectedDate) {
      const year = getYear(parseISO(selectedDate))
      const month = getMonth(parseISO(selectedDate))
      const day = getDate(parseISO(selectedDate))
      dispatch(
        getBookingByDateAC(
          id,
          `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        ),
      )
    }
  }, [selectedDate])

  useEffect(() => {
    setTotal(
      Number(
        (adult * priceAdult + childrenn * priceChild) *
          (1 - (adult + childrenn >= discount.quantity ? discount.discount / 100 : 0)),
      ).toFixed(2),
    )
  }, [adult, childrenn])

  useEffect(() => {
    const getDates = (allDays) => {
      if (!allDays) return
      return allDays.reduce(
        (acc, el) =>
          acc.find((d) => isSameDay(parseISO(el), parseISO(d))) ? acc : acc.concat([el]),
        [],
      )
    }
    if (time?.length) setDates(getDates(time))
  }, [time])

  useEffect(() => {
    const getAppointments = (day, allDays) => {
      if (!allDays) return
      const thisDay = allDays.filter((d) => isSameDay(parseISO(day), parseISO(d)))
      return thisDay
    }
    setAppointments(getAppointments(selectedDate, time))
  }, [selectedDate])

  return (
    <div className={styles.wrapper}>
      <div className={cls(styles.container, styles.gray)}>
        <div className={styles.content}>
          <ImagePreviewer images={[coverPhoto].concat(otherPhotos)} />
          <div className={styles.inner_content}>
            <p className={styles.exp_heading}>Experience title</p>
            <form className={styles.form} onSubmit={handleSubmit(onBook)}>
              <div
                className={cls(styles.input_number, 'exp-guests_number')}
                onClick={() => setVisibilityGuestsSelector((v) => !v)}
              >
                <GuestsSelector
                  visible={visible}
                  discount={discount}
                  guests={guests}
                  priceAdult={priceAdult}
                  priceChild={priceChild}
                  adult={adult}
                  setAdultCount={setAdultCount}
                  childrenn={childrenn}
                  setChildrenCount={setChildrenCount}
                />

                <label className={styles.label}>Number of guests</label>
                <div className={cls(styles.input_wrapper, 'exp-page-input')}>
                  <div className={styles.success}>
                    {adult + childrenn >= discount.quantity ? `${discount.discount}% OFF` : ''}
                  </div>
                  <input
                    className={styles.input}
                    type="text"
                    value={`${adult + childrenn} people`}
                  />
                </div>
              </div>
              <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                dates={dates}
                appointments={appointments}
              />
              <div className={styles.info_wrapper}>
                <div className={styles.info_container}>
                  <div className={styles.info_text}>
                    {`Adults x ${adult} ($${priceAdult}) = $${adult * priceAdult}`}
                  </div>
                  <div
                    className={styles.info_text}
                  >{`Children x ${childrenn} ($${priceChild}) = $${childrenn * priceChild}`}</div>
                  <div className={styles.info_text}>
                    Total
                    <span
                      className={
                        adult + childrenn >= discount.quantity
                          ? styles.discount_total
                          : styles.no_discount
                      }
                    >
                      {` (with ${discount.discount}% discount) `}
                    </span>
                    {` = ${total} HKD`}
                  </div>
                </div>
                <div className={cls(styles.button_container, 'booking_btn')}>
                  <Button type="primary" block size="large" htmlType="submit">
                    {`BOOK FOR ${total} HKD`}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

ExpHeader.propTypes = {}

export default ExpHeader
