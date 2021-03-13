import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useSortableData from 'hooks/useSortable'
import { getFlBookingHistoryAC } from 'actions/booking-history'
import ListContainer from 'components/ListContainer/index'
import styles from './bookingHistory.module.scss'
import TableHeader from './components/TableHeader'
import TableRaw from './components/TableRaw'

function BookingHistory() {
  const dispatch = useDispatch()
  const bookings = useSelector((state) => state.fmBookingsHistory.flBookings)
  const currentPage = useSelector((state) => state.fmBookingsHistory.flBookingHistoryPage)
  const reviewsCount = useSelector((state) => state.fmBookingsHistory.flBookingHistoryCount)
  const isRequesting = useSelector((state) => state.fmBookingsHistory.requesting)

  const [data, setData] = React.useState()
  const [isPastExpShown, setIsPastExpShown] = React.useState(false)

  const { items, requestSort } = useSortableData(bookings, {
    key: 'product',
    direction: 'descending',
  })

  React.useEffect(() => {
    dispatch(getFlBookingHistoryAC({ page: currentPage, showPast: isPastExpShown }))
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    setData(items)
  }, [items])

  const pageChange = (newPage) => {
    dispatch(getFlBookingHistoryAC({ page: newPage, showPast: isPastExpShown }))
  }

  const showPrev = () => {
    if (isRequesting) {
      return
    }
    if (isPastExpShown) {
      dispatch(getFlBookingHistoryAC({ page: 1, showPast: false }))
      setIsPastExpShown(false)
    } else {
      dispatch(getFlBookingHistoryAC({ page: 1, showPast: true }))
      setIsPastExpShown(true)
    }
  }

  return data ? (
    <div className={styles.main_wrapper}>
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
