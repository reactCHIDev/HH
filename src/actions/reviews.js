import {
  GET_UNREVIEWED_PRODUCT_REQUESTING,
  GET_UNREVIEWED_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REVIEW_REQUESTING,
  GET_FL_REVIEWS_REQUESTING,
  GET_FL_REVIEWS_SUCCESS,
  OPEN_REVIEW_MODAL,
  GET_PRODUCT_REVIEWS_REQUESTING,
  GET_PRODUCT_REVIEWS_SUCCESS,
  GET_REVIEWS_FOR_PRODUCTS_REQUESTING,
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

export const getFlProductReviewsAC = (data) => ({
  type: GET_FL_REVIEWS_REQUESTING,
  data,
})

export const getFlProductReviewsSuccess = (data) => ({
  type: GET_FL_REVIEWS_SUCCESS,
  data,
})

export const openReviewModal = () => ({
  type: OPEN_REVIEW_MODAL,
})

export const getProductReviewsAC = (data) => ({
  type: GET_PRODUCT_REVIEWS_REQUESTING,
  data,
})

export const getProductReviewsSuccess = (data) => ({
  type: GET_PRODUCT_REVIEWS_SUCCESS,
  data,
})

export const getReviewsForProductAC = (data) => ({
  type: GET_REVIEWS_FOR_PRODUCTS_REQUESTING,
  data,
})
