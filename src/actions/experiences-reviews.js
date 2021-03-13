import {
  GET_EXPERIENCE_REVIEW_REQUESTING,
  GET_EXPERIENCE_REVIEW_SUCCESS,
  GET_EXPERIENCE_REVIEW_ERROR,
  GET_UNREVIEWED_EXPERIENCE_REQUESTING,
  GET_UNREVIEWED_EXPERIENCE_SUCCESS,
  CREATE_EXPERIENCE_REVIEW_REQUESTING,
  GET_FL_EXPERIENCE_REVIEWS_REQUESTING,
  GET_FL_EXPERIENCE_REVIEWS_SUCCESS,
  OPEN_EXP_REVIEW_MODAL,
} from './constants'

export const createExperienceReviewAC = (payload) => ({
  type: CREATE_EXPERIENCE_REVIEW_REQUESTING,
  payload,
})

export const getUnreviewedExperienceAC = () => ({
  type: GET_UNREVIEWED_EXPERIENCE_REQUESTING,
})

export const getUnreviewedExperienceSuccess = (data) => ({
  type: GET_UNREVIEWED_EXPERIENCE_SUCCESS,
  data,
})

export const getExperienceReviewAC = (payload) => ({
  type: GET_EXPERIENCE_REVIEW_REQUESTING,
  payload,
})

export const getExperienceReviewSuccess = (payload) => ({
  type: GET_EXPERIENCE_REVIEW_SUCCESS,
  payload,
})

export const getExperienceReviewError = (payload) => ({
  type: GET_EXPERIENCE_REVIEW_ERROR,
  payload,
})

export const getFLExperienceReviewsAC = (payload) => ({
  type: GET_FL_EXPERIENCE_REVIEWS_REQUESTING,
  payload,
})

export const getFLExperiencesReviewSuccess = (payload) => ({
  type: GET_FL_EXPERIENCE_REVIEWS_SUCCESS,
  payload,
})

export const openReviewModal = () => ({
  type: OPEN_EXP_REVIEW_MODAL,
})
