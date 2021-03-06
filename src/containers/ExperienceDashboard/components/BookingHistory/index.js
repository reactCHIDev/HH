import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'

import useSortableData from 'hooks/useSortable'
import { getFmBookingHistoryAC } from 'actions/booking-history'
import ListContainer from 'components/ListContainer/index'

import Header from './components/Header'
import styles from './bookingHistory.module.scss'
import TableHeader from './components/TableHeader'
import TableRaw from './components/TableRaw'

function BookingHistory() {
  const dispatch = useDispatch()
  const bookings = useSelector((state) => state.fmBookingsHistory.bookings)
  const currentPage = useSelector((state) => state.fmBookingsHistory.bookingHistoryPage)
  const reviewsCount = useSelector((state) => state.fmBookingsHistory.bookingHistoryCount)
  const isRequesting = useSelector((state) => state.fmBookingsHistory.requesting)

  const [isPastExpShown, setIsPastExpShown] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const [data, setData] = React.useState()

  const { items, requestSort } = useSortableData(bookings, {
    key: 'product',
    direction: 'descending',
  })

  React.useEffect(() => {
    dispatch(getFmBookingHistoryAC({ page: currentPage, showPast: isPastExpShown }))
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
    if (date) {
      const { 0: start, 1: end } = date
      const newState = cloneDeep(items).filter((e) => isDateValid(e.time, start, end))
      setData(newState)
    } else {
      setData(items)
    }
  }

  const pageChange = (newPage) => {
    dispatch(getFmBookingHistoryAC({ page: newPage, showPast: isPastExpShown }))
  }

  const showPrev = () => {
    if (isRequesting) {
      return
    }
    if (isPastExpShown) {
      dispatch(getFmBookingHistoryAC({ page: 1, showPast: false }))
      setIsPastExpShown(false)
    } else {
      dispatch(getFmBookingHistoryAC({ page: 1, showPast: true }))
      setIsPastExpShown(true)
    }
  }

  return data ? (
    <div className={styles.main_wrapper}>
      <Header onSearch={setSearchValue} onDateChange={onDateChange} />

      <div className={styles.container}>
        <div className={styles.tableWrapper}>
          <TableHeader requestSort={requestSort} />
          <ListContainer
            page={currentPage}
            pageChange={pageChange}
            pageSize={5}
            total={reviewsCount}
          >
            <div style={{ marginBottom: '20px' }}>
              {data.map((el) => (
                <TableRaw key={el.id} element={el} />
              ))}
            </div>
            <div className={styles.button} onClick={() => showPrev()}>
              &#8634; {isPastExpShown ? 'new' : 'past'} experiences
            </div>
          </ListContainer>
        </div>
      </div>
    </div>
  ) : (
    <div>---</div>
  )
}

export default BookingHistory
