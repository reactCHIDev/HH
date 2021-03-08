/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { getBookingByDateAC } from 'actions/experience'
import { stripeCheckoutAC } from 'actions/stripe'
import toggleFavouriteAc from 'actions/favourites'
import { parseISO, isSameDay, getDate, getMonth, getYear, differenceInMinutes } from 'date-fns'
import { Button } from 'antd'
import { setItem } from 'utils/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import LikeIcon from 'assets/icons/svg/like-icon.svg'
import LikeIconGray from 'assets/icons/svg/like-icon-gray.svg'
import ExpShare from 'assets/icons/svg/exp-share.svg'
import ImagePreviewer from 'pages/ProductPage/components/ImagePreviewer'
import GuestsSelector from '../GuestsSelector'
import Calendar from '../Calendar'
import styles from './exp_page_header.module.scss'
import './exp_page_header.less'

const ExpHeader = ({ experience, user }) => {
  const {
    title,
    id,
    duration,
    coverPhoto,
    otherPhotos,
    guests,
    isAdult,
    discount,
    time,
    priceAdult,
    priceChild,
    isFavorite,
  } = experience
  console.log(experience, 'exp')
  const { firstName, lastName } = user

  const [selectedDate, setSelectedDate] = useState()
  const [selectedTime, setSelectedTime] = useState('')
  const [dates, setDates] = useState([])
  const [appointments, setAppointments] = useState([])
  const [visible, setVisibilityGuestsSelector] = useState(false)
  const [adult, setAdultCount] = useState(1)
  const [childrenn, setChildrenCount] = useState(0)
  const [total, setTotal] = useState(0)
  const [available, setAvailable] = useState(guests)
  const [isFavourite, setIsFavourite] = useState(isFavorite)

  const bookingsByDate = useSelector((state) => state.experience.bookingByDate)

  const dispatch = useDispatch()

  useEffect(() => {
    //time
    const getDates = (allDays) => {
      if (!allDays) return
      return allDays
        .filter((d) => differenceInMinutes(parseISO(d), new Date()) > 0)
        .reduce(
          (acc, el) =>
            acc.find((d) => isSameDay(parseISO(el), parseISO(d))) ? acc : acc.concat([el]),
          [],
        )
    }
    if (time?.length) {
      const dates = getDates(time)
      setDates(dates) // dates
      setSelectedDate(dates[0] || '')
    }
    setAppointments([])
  }, [time])

  useEffect(() => {
    // selectedDate
    if (selectedDate) {
      const year = getYear(parseISO(selectedDate))
      const month = getMonth(parseISO(selectedDate))
      const day = getDate(parseISO(selectedDate))
      dispatch(
        getBookingByDateAC(
          id,
          `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        ),
      )
    }

    setSelectedTime('')
    setAdultCount(1)
    setChildrenCount(0)
  }, [selectedDate])

  useEffect(() => {
    // bookingsByDate
    const getAppointments = (selectedDay, allDays) => {
      if (!allDays) return
      const thisDay = allDays.filter((d) => isSameDay(parseISO(selectedDay), parseISO(d)))
      return thisDay
    }

    setAppointments(
      getAppointments(selectedDate, time).filter(
        (d) => differenceInMinutes(parseISO(d), new Date()) > 0,
      ),
    )
    setSelectedTime('')
  }, [bookingsByDate])

  useEffect(() => {
    // selectedTime
    if (selectedTime) {
      const getAvailablePlaces = (appointmentTime, bookingList, guestsLimit) => {
        const booking = bookingList.filter((b) => b.time === appointmentTime)
        const available = booking.length
          ? guestsLimit -
            booking.reduce(
              (acc, el) => acc + (el.guests?.adults || 0) + (el.guests?.children || 0),
              0,
            )
          : guestsLimit

        return available
      }
      setAvailable(getAvailablePlaces(selectedTime, bookingsByDate, guests))
    }
  }, [selectedTime])

  useEffect(() => {
    // adult, childrenn
    setTotal(
      Number(
        Number(
          (adult * priceAdult + childrenn * priceChild) *
            (1 - (adult + childrenn >= discount.quantity ? discount.discount / 100 : 0)),
        ).toFixed(2),
      ),
    )
  }, [adult, childrenn])

  const onBook = () => {
    const guests = {}
    if (adult > 0) guests.adults = adult
    if (childrenn > 0) guests.children = childrenn
    const bookData = {
      guests,
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
  }

  const guestSelectorSwitch = () => {
    setVisibilityGuestsSelector(!visible)
  }

  const likeClick = () => {
    setIsFavourite((f) => !f)
    dispatch(toggleFavouriteAc({ id, type: 'exp' }))
  }

  const shareClick = () => {
    dispatch()
  }

  return (
    <div className={styles.wrapper}>
      <div className={cls(styles.container, styles.gray)}>
        <div className={styles.content}>
          <ImagePreviewer images={[coverPhoto].concat(otherPhotos)} />
          {dates.length ? (
            <div className={styles.inner_content}>
              <p className={styles.exp_heading}>
                <span>
                  {title} {isAdult && <span className={styles.adults_only}>18+</span>}
                </span>
                <span>
                  <span className={styles.like_btn} onClick={likeClick}>
                    <img src={isFavourite ? LikeIcon : LikeIconGray} alt="like" />
                  </span>
                  <span className={styles.like_btn} onClick={shareClick}>
                    <img src={ExpShare} alt="share" />
                  </span>
                </span>
              </p>
              <div className={cls(styles.input_number, 'exp-guests_number')}>
                <GuestsSelector
                  visible={visible}
                  setVisibilityGuestsSelector={setVisibilityGuestsSelector}
                  discount={discount}
                  guests={guests}
                  isAdult={isAdult}
                  priceAdult={priceAdult}
                  priceChild={priceChild}
                  adult={adult}
                  setAdultCount={setAdultCount}
                  childrenn={childrenn}
                  setChildrenCount={setChildrenCount}
                  available={available}
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
                    onClick={guestSelectorSwitch}
                    onChange={() => null}
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
                bookingsByDate={bookingsByDate}
                guests={guests}
                available={available}
                duration={duration}
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
                  <Button
                    type="primary"
                    block
                    size="large"
                    disabled={!selectedTime || adult + childrenn === 0}
                    onClick={onBook}
                  >
                    {`${selectedTime ? `BOOK FOR ${total} HKD` : 'SELECT TIME'}`}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className={styles.no_data}>No available events</p>
          )}
        </div>
      </div>
    </div>
  )
}

ExpHeader.propTypes = {}

export default ExpHeader
