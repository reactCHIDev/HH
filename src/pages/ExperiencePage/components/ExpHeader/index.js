import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { parseISO, isSameDay } from 'date-fns'
import { InputNumber, Button } from 'antd'
import GuestsSelector from '../GuestsSelector'
import { useForm, Controller } from 'react-hook-form'
import _ from 'lodash/fp'
import ImagePreviewer from 'pages/ProductPage/components/ImagePreviewer'
import Calendar from '../Calendar'
import styles from './exp_page_header.module.scss'
import './exp_page_header.less'

const ExpHeader = ({ experience, user }) => {
  const { id, coverPhoto, otherPhotos, guests, discount, time, priceAdult, priceChild } = experience
  const { firstName, lastName } = user

  const [selectedDate, setSelectedDate] = useState()
  const [selectedTime, setSelectedTime] = useState()
  const [dates, setDates] = useState([])
  const [appointments, setAppointments] = useState([])
  const [visible, setVisibilityGuestsSelector] = useState(false)
  const [adult, setAdultCount] = useState(1)
  const [children, setChildrenCount] = useState(0)
  const [total, setTotal] = useState(0)

  const { handleSubmit, control, errors } = useForm({
    mode: 'onBlur',
  })

  const onBook = (data) => {
    const bookData = {
      guests: {
        adults: 10,
        children: 5,
      },
      time: selectedTime,
      experienceId: id,
      totalPrice: 250,
      currency: 'HKD',
      firstName,
      lastName,
      phone: '123 12345678',
    }
    console.log('%c   bookData   ', 'color: darkgreen; background: palegreen;', bookData)
  }

  useEffect(() => {
    setTotal(
      Number(
        (adult * priceAdult + children * priceChild) *
          (1 - (adult + children >= discount.quantity ? discount.discount / 100 : 0)),
      ).toFixed(2),
    )
  }, [adult, children])

  useEffect(() => {
    const getDates = (allDays) => {
      if (!allDays) return
      return allDays.reduce(
        (acc, el, i, arr) =>
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
                  children={children}
                  setChildrenCount={setChildrenCount}
                />

                <label className={styles.label}>Number of guests</label>
                <div className={cls(styles.input_wrapper, 'exp-page-input')}>
                  <div className={styles.success}>
                    {adult + children >= discount.quantity ? `${discount.discount}% OFF` : ''}
                  </div>
                  <input
                    className={styles.input}
                    type="text"
                    value={`${adult + children} people`}
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
                  >{`Children x ${children} ($${priceChild}) = $${children * priceChild}`}</div>
                  <div className={styles.info_text}>
                    Total
                    <span
                      className={
                        adult + children >= discount.quantity
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
