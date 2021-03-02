import {
  CREATE_EXPERIENCE_REQUESTING,
  UPDATE_EXPERIENCE_REQUESTING,
  GET_EXPERIENCE_BY_DATE_REQUESTING,
  GET_EXPERIENCE_BY_ID_REQUESTING,
  GET_BOOKING_BY_DATE_REQUESTING,
  CREATE_PUBLIC_BOOKING_REQUESTING,
  GET_FM_BOOKING_INFO_REQUESTING,
  GET_FL_BOOKING_INFO_REQUESTING,
} from './constants'

export const createExperienceAC = (payload) => ({
  type: CREATE_EXPERIENCE_REQUESTING,
  payload,
})

export const updateExperienceAC = (payload) => ({
  type: UPDATE_EXPERIENCE_REQUESTING,
  payload,
})

export const getExperiencesByDateAC = (payload) => ({
  type: GET_EXPERIENCE_BY_DATE_REQUESTING,
  payload,
})

export const duplicateAC = (payload) => ({
  type: 'DUPLICATE_EXPERIENCE_REQUESTING',
  payload,
})

export const getExperienceByIdAC = (payload) => ({
  type: GET_EXPERIENCE_BY_ID_REQUESTING,
  payload,
})

export const getBookingByDateAC = (id, date) => ({
  type: GET_BOOKING_BY_DATE_REQUESTING,
  id,
  date,
})

export const createPublicBookingAC = (payload) => ({
  type: CREATE_PUBLIC_BOOKING_REQUESTING,
  payload,
})

export const getFMBookingInfoAC = (payload) => ({
  type: GET_FM_BOOKING_INFO_REQUESTING,
  payload,
})

export const getFLBookingInfoAC = (payload) => ({
  type: GET_FL_BOOKING_INFO_REQUESTING,
  payload,
})
