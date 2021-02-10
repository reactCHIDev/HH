import {
  GET_UNREVIEWED_PRODUCT_REQUESTING,
  GET_UNREVIEWED_PRODUCT_SUCCESS,
  GET_UNREVIEWED_PRODUCT_ERROR,
  CREATE_PRODUCT_REVIEW_REQUESTING,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_ERROR,
  GET_FL_REVIEWS_REQUESTING,
  GET_FL_REVIEWS_SUCCESS,
  GET_FL_REVIEWS_ERROR,
  OPEN_REVIEW_MODAL,
} from './constants'

export const getUnreviewedProductAC = () => ({
  type: GET_UNREVIEWED_PRODUCT_REQUESTING,
})

export const getUnreviewedProductSuccess = (data) => ({
  type: GET_UNREVIEWED_PRODUCT_SUCCESS,
  data,
})

export const createProductReviewAC = (data) => ({
  type: CREATE_PRODUCT_REVIEW_REQUESTING,
  data,
})

export const getFlProductReviewsAC = () => ({
  type: GET_FL_REVIEWS_REQUESTING,
})

export const getFlProductReviewsSuccess = (data) => ({
  type: GET_FL_REVIEWS_SUCCESS,
  data,
})

export const openReviewModal = () => ({
  type: OPEN_REVIEW_MODAL,
})
