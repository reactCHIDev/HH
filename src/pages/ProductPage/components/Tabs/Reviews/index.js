import React, { useState } from 'react'
import T from 'prop-types'
import Button from 'components/Button'
import ListContainer from 'components/ListContainer'
import Review from '../../Review'
import styles from './reviews.module.scss'
import './reviews.less'

const reviews = [] // Array(100).fill('q')

const Reviews = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)

  const pageChange = (newPage) => {
    setPage(newPage)
  }
  const sizeChange = (current, pageSize) => {
    setPageSize(pageSize)
  }

  return (
    <div className={styles.list_container}>
      <ListContainer
        page={page}
        pageChange={pageChange}
        onShowSizeChange={sizeChange}
        pageSize={pageSize}
        pageSizeOptions={['3', '10', '50']}
        total={reviews.length}
      >
        {reviews.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize).map((r) => (
          <Review key={r} />
        ))}
      </ListContainer>
      <div className={styles.btn_container}>
        <Button title="Add review" onClick={() => {}} />
      </div>
    </div>
  )
}

Reviews.propTypes = {}

export default Reviews
