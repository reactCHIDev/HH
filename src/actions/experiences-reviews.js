import {
  GET_EXPERIENCE_REVIEW_REQUESTING,
  GET_EXPERIENCE_REVIEW_SUCCESS,
  GET_EXPERIENCE_REVIEW_ERROR,
  //
  GET_UNREVIEWED_EXPERIENCE_REQUESTING,
  GET_UNREVIEWED_EXPERIENCE_SUCCESS,
  //
  CREATE_EXPERIENCE_REVIEW_REQUESTING,
} from './constants'

export const createExperienceReviewAC = (data) => ({
  type: CREATE_EXPERIENCE_REVIEW_REQUESTING,
  data,
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
