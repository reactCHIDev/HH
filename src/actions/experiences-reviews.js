import {
  GET_EXPERIENCE_REVIEW_REQUESTING,
  GET_EXPERIENCE_REVIEW_SUCCESS,
  GET_EXPERIENCE_REVIEW_ERROR,
} from './constants'

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
