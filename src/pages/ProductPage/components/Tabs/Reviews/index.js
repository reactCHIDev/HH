/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'components/Button'
import Modal from 'components/UniversalModal'
import ListContainer from 'components/ListContainer'
import { getProductReviewsAC } from 'actions/reviews'

import Review from '../../Review'
import ReviewModal from './ReviewModal'
import styles from './reviews.module.scss'
import './reviews.less'

const Reviews = ({
  productReviews,
  productReviewsCount,
  currentPage,
  productId,
  isUserCanReview,
}) => {
  const [isModalShown, setIsModalShown] = useState(false)

  const dispatch = useDispatch()

  const pageChange = (newPage) => {
    dispatch(getProductReviewsAC({ id: productId, page: newPage }))
  }

  const closeModal = () => {
    setIsModalShown(false)
  }

  return (
    <div className={styles.list_container}>
      <ListContainer
        page={currentPage}
        pageChange={pageChange}
        pageSize={3}
        total={productReviewsCount}
      >
        {productReviews.map((r) => (
          <Review key={r.id} el={r} />
        ))}
      </ListContainer>
      {isUserCanReview && (
        <div className={styles.btn_container}>
          <Button
            title="Add review"
            onClick={() => {
              setIsModalShown(true)
            }}
          />
        </div>
      )}
      {isModalShown && (
        <Modal option>
          <ReviewModal closeFunc={closeModal} productId={productId} />
        </Modal>
      )}
    </div>
  )
}

Reviews.propTypes = {}

export default Reviews
