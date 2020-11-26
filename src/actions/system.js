import {
  GET_SPECIALITY_TAGS_REQUESTING,
  GET_SPECIALITY_TAGS_SUCCESS,
  GET_SPECIALITY_TAGS_ERROR,
} from './constants'

export const getSpecialityTagsAC = () => ({
  type: GET_SPECIALITY_TAGS_REQUESTING,
})

export const getSpecialityTagsSuccessAC = (payload) => ({
  type: GET_SPECIALITY_TAGS_SUCCESS,
  payload,
})

export const getSpecialityTagsErrorAC = (payload) => ({
  type: GET_SPECIALITY_TAGS_ERROR,
  payload,
})
