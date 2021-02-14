import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getExperienceReviewAC } from 'actions/experiences-reviews'
import useSortableData from 'hooks/useSortable'
import Header from './components/Header'
import Review from './components/Review'
import styles from './reviews.module.scss'

function ReviewsContainer() {
  const dispatch = useDispatch()
  const bookings = useSelector((state) => state.fmBookingsHistory.bookings)

  const [data, setData] = React.useState()

  const { items, requestSort } = useSortableData(bookings, {
    key: 'product',
    direction: 'descending',
  })

  React.useEffect(() => {
    dispatch(getExperienceReviewAC())
  }, [])

  React.useEffect(() => {
    setData(items)
  }, [items])

  return (
    <div className={styles.main_wrapper}>
      <Header />
      <div>
        <Review />
      </div>
      {/* {data && data.map((el) => <div key={el.id}>123</div>)} */}
    </div>
  )
}

export default ReviewsContainer
