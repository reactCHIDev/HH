import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'

import useSortableData from 'hooks/useSortable'
import { getFmBookingHistoryAC } from 'actions/booking-history'
import Header from './components/Header'
import styles from './bookingHistory.module.scss'

function BookingHistory() {
  const dispatch = useDispatch()
  const bookings = useSelector((state) => state.fmBookingsHistory.bookings)
  const [searchValue, setSearchValue] = React.useState('')
  const [data, setData] = React.useState()

  const { items, requestSort } = useSortableData(bookings, {
    key: 'createdAt',
    direction: 'descending',
  })

  React.useEffect(() => {
    dispatch(getFmBookingHistoryAC())
  }, [])

  React.useEffect(() => {
    setData(items)
  }, [items])

  React.useEffect(() => {
    if (searchValue) {
      const lowerSearchValue = searchValue.toLowerCase()
      const newState = cloneDeep(items).filter((e) =>
        Object.keys(e).some((n) =>
          String(e[n])
            .toLowerCase()
            .includes(lowerSearchValue),
        ),
      )
      setData(newState)
    } else {
      setData(items)
    }
  }, [searchValue])

  const isDateValid = (curTime, startTime, endTime) => {
    const c = new Date(curTime).setUTCHours(0, 0, 0, 0)
    const s = new Date(startTime).setUTCHours(0, 0, 0, 0)
    const e = new Date(endTime).setUTCHours(0, 0, 0, 0)
    return s <= c && c <= e
  }

  const onDateChange = (date) => {
    const { 0: start, 1: end } = date
    if (date) {
      const newState = cloneDeep(items).filter((e) => isDateValid(e.createdAt, start, end))
      setData(newState)
    } else {
      setData(items)
    }
  }
  return data ? (
    <div className={styles.container}>
      <Header />
    </div>
  ) : (
    <div>---</div>
  )
}

export default BookingHistory
