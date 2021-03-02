import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'

import useSortableData from 'hooks/useSortable'
import { getFmBookingHistoryAC } from 'actions/booking-history'
import Header from './components/Header'
import styles from './bookingHistory.module.scss'
import TableHeader from './components/TableHeader'
import TableRaw from './components/TableRaw'

function BookingHistory() {
  const dispatch = useDispatch()
  const bookings = useSelector((state) => state.fmBookingsHistory.bookings)
  const [data, setData] = React.useState()

  const { items, requestSort } = useSortableData(bookings, {
    key: 'product',
    direction: 'descending',
  })

  React.useEffect(() => {
    dispatch(getFmBookingHistoryAC())
  }, [])

  React.useEffect(() => {
    setData(items)
  }, [items])

  return data ? (
    <div className={styles.main_wrapper}>
      <div className={styles.container}>
        <div className={styles.tableWrapper}>
          <TableHeader requestSort={requestSort} />
          {data.map((el) => (
            <TableRaw key={el.id} element={el} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div>---</div>
  )
}

export default BookingHistory
